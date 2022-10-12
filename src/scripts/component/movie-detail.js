import DataSource from '../data/data-source';
import $ from 'jquery';
window.jQuery = window.$ = $;
import 'jquery';
class MovieDetail extends HTMLElement {
  set setValue(value) {
    this.setAttribute('title', value.title);
    this.setAttribute('year', value.year);
    this.setAttribute('genres', value.genres);
    this.setAttribute('tagline', value.tagline);
    this.setAttribute('overview', value.overview);
    this.setAttribute('score', value.score);
    this.setAttribute('class', 'w-8/12  ');
    this.setAttribute('movie-id', value.movieId);
    this.render();
  }

  render() {
    this.title = this.getAttribute('title') || null;
    this.year = this.getAttribute('year') || null;
    this.genres = this.getAttribute('genres') || null;
    this.tagline = this.getAttribute('tagline') || null;
    this.overview = this.getAttribute('overview') || null;
    this.score = this.getAttribute('score') || null;
    this.movieId = this.getAttribute('movie-id') || null;

    this.innerHTML = `
      <div class="my-2" id="${this.movieId}">
        <h1 class="font-semibold text-white md:text-4xl sm:text-xl">${this.title} <span class="font-normal opacity-80">(${this.year.substring(0, 4)})</span></h1>
        <div class="flex items-center text-white md:text-base md:mt-5 sm:mt3">
          <span class="block p-2 bg-cyan-600 text-base rounded-lg mr-4">${this.genres}</span>
        </div>
        <div class="flex items-center text-white md:text-base sm:text-xs md:mt-10 sm:mt-5">
          <p class="font-light opacity-80 italic">"${this.tagline}"</p>
        </div>
        <div class="flex items-center text-white md:text-base sm:text-xs md:mt-10 sm:mt-5">
          <p class="font-light">${this.overview}</p>
        </div>
        <div class="flex items-center text-cyan-600 text-2xl md:mt-10 sm:mt-5" id="rating-detail">
          <div class="rating-star mt-0.5 md:text-2xl sm:text-lg text-cyan-600" data-score="${(this.score)/2}"></div>
          <h2 class="ml-6">${(this.score)/2}</h2>
        </div>
        <div class="flex items-center md:mt-10 sm:mt-5">
          <button class="font-semibold px-4 w-28 h-11 block rounded-lg bg-cyan-600 hover:bg-cyan-800"><i class="fa-solid fa-play mr-2"></i>Play</button>
          <button class="font-semibold px-4 w-28 h-11 block rounded-lg ml-4 border-2 border-cyan-600 hover:bg-cyan-600"><i class="fa-solid fa-bookmark mr-2"></i>Save</button>
        </div>
      </div>
      `;

      const similarListElement = document.querySelector('similar-movies');
      const showMovieList = async (id, type) => {
        try {
          const result = await DataSource.getMovieList(id, type);
          renderSimilarMovie(result, type);
        } catch (message) {
          fallbackResultSimilar(message);
        }
      }

      const renderSimilarMovie = (results, type) => {
        similarListElement.movies = results;
        similarListElement.type = type;

        $(`#${type}list .rating-star`).raty({ starType: 'i', readOnly: true, half: true,});

        $(`#${type}list`).slick({
          lazyLoad: 'ondemand',
          speed: 200,
          slidesToShow: 5,
          slidesToScroll: 5,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      };

    const fallbackResultSimilar = message => {
      similarListElement.renderError(message);
    };

    showMovieList(this.movieId,'similar');
  }


}

customElements.define('movie-detail', MovieDetail);