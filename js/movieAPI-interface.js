var Movie = require('./../js/movieAPI.js').movieModule;

// currentMovieObject = new Movie();

var displayName = function(allMovies) {
  allMovies.forEach(function(movie) {
  $('#showMovie').append('<li class ="specific" id = '+movie.id+'>' + movie.title + '</li>' + "<br>");
  });
  addClick(id);
};

var displayAll = function(overview, posterPath, releaseDate, runtime, name) {
  $('#showAll').append('<img src = https://image.tmdb.org/t/p/w500'+posterPath+' />');
  $('#showAll').append('<li >' + releaseDate + '</li>');
  $('#showAll').append('<li >' + 'runtime:' + runtime + '</li>');
  $('#showAll').append('<li >' + '<strong>' + name + '</strong>' + '</li>');
  $('#showAll').append('<li >' + overview + '</li>');
};


$(document).ready(function() {
  var currentMovieObject = new Movie();
  $('#go-button').click(function() {
    var movie = $('#name').val();
    $('#showMovie').empty();
    $('#name').val("");
    currentMovieObject.list(movie, displayName);

    // currentMovieObject.getName(movie, displayName);
  });
});
var addClick = function(id){
var selectedMovieObject = new Movie();

  $('.specific').click(function() {
    $('#showMovie').empty();
    $('#showAll').empty();
    id = $(this)[0].id;
    console.log(id);
    // console.log($(this)[0].id);
    // $('#movieId').val("");
    selectedMovieObject.getAll(id, displayAll);
  });
};
