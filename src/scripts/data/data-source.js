class DataSource {
  static getDetailMovie(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7bd7baa3fcdd1f731818ab6b3442c856`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson) {
        return Promise.resolve(responseJson);
      } else {
        return Promise.reject(`${id} is not found`)
      }
    })
  }

  static getMovieList(id, type) {
    return fetch(`https://api.themoviedb.org/3/movie/${id?(`${id}/`):''}${type}?api_key=7bd7baa3fcdd1f731818ab6b3442c856`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson) {
        return Promise.resolve(responseJson.results);
      } else {
        return Promise.reject(`${id} is not found`)
      }
    })
  }

  static findMovies(keyword) {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=7bd7baa3fcdd1f731818ab6b3442c856&language=en-US&page=1&include_adult=false`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson) {
        return Promise.resolve(responseJson.results);
      } else {
        return Promise.reject(`${keyword} is not found`)
      }
    })
  }
}

export default DataSource;