var Movie = require('./../js/movieAPI.js').movieModule;

var displayName = function(movie, nameData, idData) {
  $('#showMovie').append('<li class ="specific" id = '+idData+'>' + nameData + '</li>' + "<br>");
  addClick(idData);
};


var displayAll = function(overviewData, release_dateData, nameData) {
  $('#showAll').append('<li >' + nameData + '</li>');
  $('#showAll').append('<li >' + overviewData + '</li>');
  // $('#showAll').append('<li >' + "<img src = "+ poster_pathData +" alt = ""/>" + '</li>');
  $('#showAll').append('<li >' + release_dateData + '</li>');
};


$(document).ready(function() {
  var currentMovieObject = new Movie();
  $('#go-button').click(function() {
    var movie = $('#name').val();
    $('#showMovie').empty();
    $('#name').val("");
    currentMovieObject.getName(movie, displayName);
  });
});
var addClick = function(idData){
var selectedMovieObject = new Movie();

  $('.specific').click(function() {
    idData = $(this)[0].id;
    console.log(idData);
    // console.log($(this)[0].id);
    // $('#movieId').val("");
    selectedMovieObject.getAll(idData, displayAll);
    // $('#showMovie').empty();
  });
};
