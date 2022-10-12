import './movie-item.js';

class TopMovieList extends HTMLElement {

  set type(type) {
    this._type = type
    this.setAttribute('id', `${this._type}list`)
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render(){
    this.innerHTML = '';
    this.className = 'mx-6';
    this._movies.slice(0, 7).forEach(movie => {
      const movieItemElement = document.createElement('movie-item');
      movieItemElement.movie = movie;
      this.appendChild(movieItemElement);
    });
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML += `
    <style>
    .placeholder {
      font-weight: lighter;
      color: rgba(255, 255, 255);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    </style>
    <h2 class="placeholder">${message}</h2>`;
  }
}

customElements.define('top-movies', TopMovieList);