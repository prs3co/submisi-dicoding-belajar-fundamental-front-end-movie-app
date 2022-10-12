class SearchList extends HTMLElement {

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render(){
    this.innerHTML = '';
    this.className = 'bg-gray-800 rounded-xl absolute inset-x-0 top-11 z-50 w-80';
    this._movies.slice(0, 5).forEach(movie => {
      const movieItemElement = document.createElement('search-list-item');
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

customElements.define('search-list', SearchList);