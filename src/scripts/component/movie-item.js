import DataSource from '../data/data-source';
import './pop-movies';
import './top-movies';
import './similar-movies';
import './movie-detail.js'
import $ from 'jquery';
window.jQuery = window.$ = $;
import 'jquery';

class MovieItem extends HTMLElement {

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  openDetailPage() {
    $('main').hide();
    $('.detail').fadeIn();
  }

  render() {
    this.className = 'mt-8 px-4 group cursor-pointer';
    this.innerHTML = `
      <div class="card-movie" movie-id="${this._movie.id}">
        <img data-lazy="https://image.tmdb.org/t/p/w342${this._movie.poster_path}" alt="${this._movie.title}" class="h-75 rounded-2xl group-hover:scale-102 transition-transform delay-100 ease-out duration-150">
        <div class="mt-2">
          <p href="#" class="text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis">${this._movie.title}</p>
        </div>
        <div class="mt-0.5 flex flex-row justify-between text-cyan-600 text-sm" >
          <div class="rating-star" data-score="${(this._movie.vote_average)/2}"></div>
          <p>${(this._movie.vote_average)/2}</p>
        </div>
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

    const cardMovie = this.querySelector('.card-movie');
    cardMovie.addEventListener('click', function () {
      const idMovie = this.getAttribute('movie-id');
      getDetail(idMovie);
      $('html, body').animate({scrollTop: '0px'}, 300);
    });
  }
}

customElements.define('movie-item', MovieItem);