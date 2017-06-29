var apiKey = require('./../.env').apiKey;


Movie = function(movie, name, id, overview, posterPath, releaseDate, runtime){
  this.name = movie;
  this.title = name;
  this.id = id;
  this.overview = overview;
  this.poster_path = posterPath;
  this.release_date = releaseDate;
  this.runtime = runtime;
};

Movie.prototype.list = function(movie, displayName){
  $.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey + '&query=' + movie).then(function(response) {
    var allMovies = [];
    for (var i = 0; i < response.results.length; i ++){
    var newMovie = new Movie(movie, name = response.results[i].title, id =  response.results[i].id, overview = response.results[i].overview, posterPath = response.results[i].poster_path, releaseDate = response.results[i].release_date, runtime = response.results[i].runtime);
    allMovies.push(newMovie);

  }
  console.log(allMovies[0]);
  displayName(allMovies);
  });
};


// Movie.prototype.getName = function(movie, displayName) {
//   $.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey + '&query=' + movie).then(function(response) {
//     for (var i = 0; i < response.results.length; i ++){
//     displayName(movie, response.results[i].title, response.results[i].id);
//   }
//   }).fail(function(error) {
//     $('#showMovie').text(error.responseJSON.message);
//   });
// };
//
Movie.prototype.getAll = function(idData, displayAll){
  $.get('https://api.themoviedb.org/3/movie/' + idData + '?api_key=' + apiKey).then(function(response){
    console.log(JSON.stringify(response));
    displayAll(response.overview, response.poster_path, response.release_date, response.runtime, response.title);
  }).fail(function(error) {
    $('#showAll').text(error.responseJSON.message);
  });
};




exports.movieModule = Movie;


// console.log(JSON.stringify(response.results[0].title));
