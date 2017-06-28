var apiKey = require('./../.env').apiKey;

Movie = function(){
};

Movie.prototype.getName = function(movie, displayName) {
  $.get('https://api.themoviedb.org/3/search/movie?api_key='+apiKey + '&query=' + movie).then(function(response) {
    for (var i = 0; i < response.results.length; i ++){
      console.log(JSON.stringify(response.results[i].title));
    displayName(movie, response.results[i].title);
  }
  }).fail(function(error) {
    $('#showMovie').text(error.responseJSON.message);
  });
}

// Movie.prototype.getTemperature = function(city, displayTemperature) {
//   $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
//     var tempF = ((1.8 *(response.main.temp - 273)) + 32).toFixed(2);
//     displayTemperature(city, tempF);
//   }).fail(function(error) {
//     $('.showMovie').text(error.responseJSON.message);
//   });
// }

exports.movieModule = Movie;


// console.log(JSON.stringify(response.results[0].title));
