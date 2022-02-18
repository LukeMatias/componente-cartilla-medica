import React from 'react';

class AlojamientosFiltros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccion: undefined,
    };
  }

  onClasificacionClick = (itemId) => {
    window.history.pushState('', '', '?etiquetas='+itemId+'&lang='+this.props.lang);
    this.setState({seleccion: itemId});
    this.props.onChangeFunction(itemId);
  }

  componentWillMount(){
    if (this.props.seleccion){
      this.setState({seleccion: this.props.seleccion})
    }
  }

  render(){

    return (
      <div>
        <h4 className="p-0 text-primary">
          {/* <b>{this.props.translations.tipoAlojamiento}</b> */}
        </h4>

        <div className="form-check" onClick={() => {this.onClasificacionClick(null)}}>
          <input
            type="radio"
            className="form-check-input"
            value={this.state.seleccion}
            checked={this.state.seleccion === null}
          />
          {/* <label className="form-check-label">{this.props.translations.verTodos}</label> */}
        </div>

        {this.props.clasificaciones.map((item) => item.id != null
            ? <div className="form-check" key={item.id} onClick={() => {this.onClasificacionClick(item.id)}}>
                <input
                  type="radio"
                  className="form-check-input"
                  value={item.id}
                  checked={this.state.seleccion === item.id}
                />
                <label className="form-check-label">{item.nombre}</label>
              </div>
            : null
        )}
      </div>
    )
  }
}

export default AlojamientosFiltros;
