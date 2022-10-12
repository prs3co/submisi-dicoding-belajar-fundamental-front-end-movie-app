import $ from 'jquery';
window.jQuery = window.$ = $;
import 'jquery';
import 'slick-carousel-latest';
import 'raty-js';
import '../component/search-list.js';
import '../component/search-list-item.js';
import '../component/movie-detail.js'
import '../component/movie-item.js'
import '../component/pop-movies.js'
import '../component/top-movies.js'
import '../component/similar-movies.js'
import DataSource from '../data/data-source';


const main = () => {
  const popularListElement = document.querySelector('pop-movies');
  const topListElement = document.querySelector('top-movies');
  const movieSearchListElement = document.querySelector('search-list');
  const movieSearchBar = document.querySelector('#searchBar');

  const searchList = async (keyword) => {
    try {
        const result = await DataSource.findMovies(keyword);
        renderSearchList(result);
    } catch (message) {
        fallbackResultSearch(message);
    }
  }

  const showMovieList = async (id, type) => {
    try {
      const result = await DataSource.getMovieList(id, type);
      type === 'popular' ? renderPopularMovie(result, type)
        : type === 'top_rated' ? renderTopMovie(result, type): NaN;
    } catch (message) {
      type === 'popular' ? fallbackResultPop(message)
        : type === 'top_rated' ? fallbackResultTop(message): NaN;
    }
  }

  const renderPopularMovie = (results, type) => {
    popularListElement.movies = results;
    popularListElement.type = type;

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

  const renderTopMovie = (results, type) => {
    topListElement.movies = results;
    topListElement.type = type;

    $(`#${type}list .rating-star`).raty({ starType: 'i', readOnly: true, half: true,});

    $(`#${type}list`).slick({
      lazyLoad: 'ondemand',
      speed: 200,
      slidesToShow: 5,
      slidesToScroll: 1,
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

  const renderSearchList = (results) => {
    movieSearchListElement.movies = results;
  };

  const fallbackResultPop = message => {
      popularListElement.renderError(message);
  };

  const fallbackResultTop = message => {
      topListElement.renderError(message);
  };

  const fallbackResultSearch = message => {
      movieSearchListElement.renderError(message);
  };

  // Show Popular Movie List
  showMovieList('','popular');
  // Show Latest Movie List
  showMovieList('','top_rated');
  // Show Recommendation Movie List

  $(movieSearchBar).keyup(function() {
    if(this.value) {
      searchList(movieSearchBar.value);
      $(movieSearchListElement).fadeIn(500);
    } else {
      $(movieSearchListElement).fadeOut(500);
    }
  });

  $(movieSearchListElement).on('click', function() {
    $(movieSearchListElement).fadeOut(500);
  })

  $('.grad1 .rating-star').raty({ starType: 'i', readOnly: true, half: true,});

  $(document).ready(function() {
    setTimeout(function() {
      $('#ctn-preloader').addClass('loaded');
      $('body').removeClass('no-scroll-y');
      if ($('#ctn-preloader').hasClass('loaded')) {
        $('#preloader').delay(100).queue(function() {
          $(this).remove();
        });
      }
      $('html, body').animate({scrollTop: '0px'}, 300);
    }, 3000);
  });
};

export default main;