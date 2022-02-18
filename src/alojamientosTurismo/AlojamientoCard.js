import React from 'react';

class AlojamientoCard extends React.Component {
  renderEstrellas = () => {
    let estrellas = [];
    for (var i = 0; i < this.props.item.categoria.valor; i++) {
      estrellas.push(<i className="fa fa-star _amber-text" />);
    }

    return estrellas;
  };

  alojamientoLink = () => {
    return (
      this.props.config.siteLink + 'alojamientos/' + this.props.item.id + '/?lang=' + this.props.config.lang
    );
  };

  render() {
    const styles = {
      cardStyle: { backgroundImage: 'url(' + this.props.item.foto + ')' },
      linkStyle: { color: '#9e9e9e' }
    };
    const cerrado = this.props.item.cerrado ?
      <span className="badge bg-danger text-white _cerrado">{this.props.config.translations.cerrado}</span>
      : null;
    const {item} = this.props
    return (
      <div className={`${this.props.cols} d-flex align-items-stretch`}>
        <div className="listing-wrap">
          <a href={this.alojamientoLink()} className="d-flex align-items-center justify-content-center glightbox">
            <div className="img h-100" style={styles.cardStyle}></div>
          </a>
          <div className="text text-center">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fal fa-hotel"></span>
            </div>
            <p className="p-0 subheading mb-2">
              {this.renderEstrellas()}
            </p>
            <h3 className="p-0"><a className="stretched-link" href={this.alojamientoLink()}>{item.nombre}</a></h3>
            <ul>
              <li><p className="p-0"><span className="fa fa-map-marker-alt"></span> {item.domicilio}</p></li>
              {item.contactos.map(contacto => contacto.tipo === "Teléfono" ? <li><p className="p-0"><span className="fa fa-phone"></span>{contacto.valor}</p></li> : '')}
            </ul>
            {cerrado}
          </div>
        </div>
      </div>
    );
  }
}

export default AlojamientoCard;
