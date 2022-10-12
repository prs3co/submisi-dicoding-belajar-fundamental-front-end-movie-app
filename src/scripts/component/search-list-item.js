import DataSource from '../data/data-source';
import './search-list.js';
import $ from 'jquery';
window.jQuery = window.$ = $;
import 'jquery';

class SearchListItem extends HTMLElement {

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  openDetailPage() {
    $('main').hide();
    $('.detail').fadeIn();
  }

  render() {
    this.setAttribute('movie-id', this._movie.id);
    this.className = 'cursor-pointer search-list-item flex py-2 px-2 h-20 rounded-lg bg-gray-800 hover:bg-gray-900 transition ease-out delay-75 duration-100';
    this.innerHTML = `
      <div class = "search-item-thumbnail mx-2 flex flex-col justify-center">
        <img src ="https://image.tmdb.org/t/p/w92${this._movie.poster_path}" class="w-11 rounded-sm">
      </div>
      <div class = "search-item-info mx-2 justify-center flex flex-col">
        <h3>${this._movie.title}</h3>
      </div>
    `;

    const getDetail = async (id) => {
      try {
        const result = await DataSource.getDetailMovie(id);
        renderDetailMovie(result);
      } catch (message) {
        fallbackResult(message);
      }
    }

    const renderDetailMovie = results => {
      this.openDetailPage();
      let genres = [];
      results.genres.forEach(genre => genres.push(genre.name));
      let genreName = genres.join(', ');
      $('#detail-page').css('display', 'block');
      $('#detailPoster').attr('src', `https://image.tmdb.org/t/p/w342${results.poster_path}`);

      const movieDetailElement = document.querySelector('movie-detail');
      const detailMovie = {
        'title': results.title ? results.title : 'notfound',
        'year': results.release_date ? results.release_date : 'notfound',
        'genres': results.genres ? genreName : 'notfound',
        'tagline': results.tagline ? results.tagline : 'notfound',
        'overview': results.overview ? results.overview : 'notfound',
        'score': results.vote_average ? results.vote_average : 'notfound',
        'movieId': results.id ? results.id : 'notfound'
      }
      movieDetailElement.setValue = detailMovie;
      $('movie-detail .rating-star').raty({ starType: 'i', readOnly: true, half: true,});
    };

    const fallbackResult = message => {
      alert(message);
    };

    this.addEventListener('click', function () {
      const idMovie = this.getAttribute('movie-id');
      getDetail(idMovie);
    });
  }
}

customElements.define('search-list-item', SearchListItem);