import React from 'react';
import AlojamientoCard from './AlojamientoCard';
import AlojamientosFiltros from './AlojamientosFiltros';
import CargandoSpinner from './CargandoSpinner';
import {flow, uniqBy, map, sortBy} from 'lodash/fp';
// import {parse} from 'query-string';

class AlojamientosLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alojamientos: [],
      filtrados: [],
      clasificaciones: [],
      etSeleccionada: null,
      lang: ''
    };
  }

  filtrar = (filtro) => {
    if (filtro === null){
      this.setState({filtrados: this.state.alojamientos})
    }
    else {
      var alojamientosFiltrados = [];
      this.state.alojamientos.forEach((item) => {
        if (item.clasificacion.id === filtro){
          alojamientosFiltrados.push(item);
        }
      })
      this.setState({filtrados: alojamientosFiltrados});
    }
  }

  buildClasificaciones = (alojamientos) => {
    return flow(
      map((item) => item.clasificacion),
      uniqBy('id'),
      sortBy('nombre')
    )(alojamientos)
  }

  fetchAlojamientos = () => {
    // fetch(window.viewVars.siteLink + 'api/suit/alojamientos/?idioma=' + this.state.lang.substr(0, 2))
    fetch("https://turismoushuaia.com/api/suit/alojamientos/?idioma=es")
      .then((response) => response.json())
      .then((data) =>{ 
          
        console.log(data)
        this.setState({
        alojamientos:data.alojamientos,
        filtrados:data.alojamientos,
        clasificaciones: this.buildClasificaciones(data.alojamientos)
      }, () => {
        this.filtrar(this.state.etSeleccionada);
      })});
  }

//   componentWillMount(){
//     var etiqueta = parse(location.search).etiquetas || null;
//     etiqueta = etiqueta === 'null' ? null : etiqueta;
//     this.setState({etSeleccionada: etiqueta, lang: window.viewVars.lang}, () => this.fetchAlojamientos());
//   }

  render() {
    const content = (this.state.filtrados.length === 0)
      ? <CargandoSpinner/>
      : this.state.filtrados.map((item) => {
          return <AlojamientoCard key={item.id} cols="col-md-6 col-lg-4" config={window.viewVars} item={item} />
          }
        )

    return (
      <div className="row">
        <div className="col-md-10 row p-0">
          {content}
        </div>
        <div className="col-md-2">
          <AlojamientosFiltros 
        //    translations={window.viewVars.translations}
            lang={this.state.lang} seleccion={this.state.etSeleccionada} onChangeFunction={this.filtrar} clasificaciones={this.state.clasificaciones} categorias={this.state.categorias}/>
        </div>
      </div>
    );
  }
}

export default AlojamientosLista;
