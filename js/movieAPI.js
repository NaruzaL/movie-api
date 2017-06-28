var apiKey = require('./../.env').apiKey;

Movie = function(){
};

Movie.prototype.getName = function(movie, displayName) {
  $.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey + '&query=' + movie).then(function(response) {
    for (var i = 0; i < response.results.length; i ++){
    displayName(movie, response.results[i].title, response.results[i].id);
  }
  }).fail(function(error) {
    $('#showMovie').text(error.responseJSON.message);
  });
};

Movie.prototype.getAll = function(idData, displayAll){
  $.get('https://api.themoviedb.org/3/movie/' + idData + '?api_key=' + apiKey).then(function(response){
    console.log(JSON.stringify(response));
    displayAll(response.title, response.overview, response.release_date);
  }).fail(function(error) {
    $('#showAll').text(error.responseJSON.message);
  });
};


exports.movieModule = Movie;


// console.log(JSON.stringify(response.results[0].title));
