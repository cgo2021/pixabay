import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {
  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    // Leer el state de la pagian actual
    let pagina = this.state.pagina;
    // Restar uno a la pagian actual si es > 1
    if(pagina === 1) return null;
    pagina--;
    // Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    // Leer el state de la pagian actual
    let pagina = this.state.pagina;
    // Sumar uno a la pagian actual
    pagina++;
    // Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=30162840-087d4a1aa7ed62f0a1826e4fd&q=${termino}&per_page=30&page=${pagina}`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({ imagenes: resultado.hits }))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className='app container'>
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de imágenes...</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className='row justify-content-center'>
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
