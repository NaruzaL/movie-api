var Movie = require('./../js/movieAPI.js').movieModule;

// currentMovieObject = new Movie();

var displayName = function(allMovies) {
  allMovies.forEach(function(movie) {
  $('#showMovie').append('<li class ="specific" id = '+movie.id+'>' + '<span class = "movieName">' + movie.title +'</span>' + ' (' +  movie.release_date + ')' + '</li>' + "<br>");
  });
  addClick(id);
};

var displayAll = function(overview, posterPath, releaseDate, runtime, name) {
  $('#showAll').append('<img src = https://image.tmdb.org/t/p/w500'+posterPath+' />');
  $('#showAll').append('<p class="movieName">' + name + '</p>');
  $('#showAll').append('<p ><strong>Release date:</strong> ' + releaseDate + '</p>');
  $('#showAll').append('<p ><strong>Runtime: </strong>' + runtime + '</p>');
  $('#showAll').append('<p ><strong>Synopsis: </strong>' + overview + '</p>');
};


$(document).ready(function() {
  $('.responses').hide();
  var currentMovieObject = new Movie();
  $('#go-button').click(function() {
    $('.responses').show();
    var movie = $('#name').val();
    $('#showMovie').empty();
    $('#showAll').empty();
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
