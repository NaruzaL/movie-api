
var Movie = require('./../js/movieAPI.js').movieModule;

var displayName = function(movie, nameData) {
  $('#showMovie').text(nameData);
};

// var displayTemperature = function(city, temperatureData) {
//   $('.showTemperature').text("The temperature in " + city + " is " + temperatureData + "°");
//   console.log(temperatureData);
// }

$(document).ready(function() {
  var currentMovieObject = new Movie();
  $('#go-button').click(function() {
    var movie = $('#name').val();
    $('#name').val("");
    currentMovieObject.getName(movie, displayName);

  });
});
