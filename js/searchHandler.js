/**
 * Year: 2016
 * Author: Danny Salazar
 *
 * This file handle all related search events and its results.
 */

function searchHandler () { }

/** Global variables. */
searchHandler.searchElementId = 'actor-name';
searchHandler.searchUrl = 'php/search.php';
searchHandler.currentPerson = -1;
searchHandler.youtubeSearch = 'https://www.youtube.com/results?search_query=';
searchHandler.imdbName = 'http://www.imdb.com/name/';
searchHandler.imdbTitle = 'http://www.imdb.com/title/';

// This method is dispatched each time the user types something, waiting for enter key.
searchHandler.handleChangeEvent = function (event) {
	var value = searchHandler.getValue();
	hideElement('messages');
	if(value == '') {
		showMessage('Please write something first!');
	}
	if(event.keyCode == 13 && value != '') {
		searchHandler.getActorsByName(value);
	}
}

// Gets the value of the text field.
searchHandler.getValue = function () {
	return $('#' + searchHandler.searchElementId).val();
}

// Callback for search person call.
searchHandler.searchPersonSuccess = function (response) {
	var result = JSON.parse(response);
	searchHandler.deleteTempPersons();

	/* if have results, we save the array temporally, to avoid and extra call to the API later. */
	if(result.results.length > 0) {
		searchHandler.setTempPersons(result.results);
	}

	/* if we have just one result, perform the movies search action inmediatly. */
	if(result.results.length == 1) {
		searchHandler.getMoviesByActorId(result.results[0].id);
	}
	else if(result.results.length > 1) {
		searchHandler.createTitleForResults(result, 'actors', 'persons-title');
		searchHandler.createPaginationForResults(result.total_pages, 'searchHandler.searchActorPage', 'persons-paginator');
		searchHandler.createPersonResults(result.results);
		showElement('persons-result');
		hideElement('results');
	}
	else {
		showMessage('There are no results for your search', 'danger');
		hideElement('persons-result');
		hideElement('results');
	}
}

// Function to display the movies result.
searchHandler.showResults = function (content) {
	var result = JSON.parse(content);

	searchHandler.createTitleForResults(result, 'movies', 'movies-result-title');

	if(result.total_pages > 1) {
		searchHandler.createPaginationForResults(result.total_pages, 'searchHandler.searchMoviePage', 'movies-result-paginator');
	}
	else {
		$('#movies-result-paginator').html('');
	}

	searchHandler.createMoviesResults(result.results);
	showElement('results');
}

// Creates title element for search (actor, movie or whatever).
searchHandler.createTitleForResults = function (result, type, divId) {
	$('#' + divId).html('');
	var totalResults = $('<div/>', { class: 'text-centered' })
		.html(result.total_results + ' ' + type + ' found!<br/>page ' + result.page + ' of ' + result.total_pages);
	$('#' + divId).append(totalResults);
}

// Creates paginator element for search (actor, movie or whatever).
searchHandler.createPaginationForResults = function (pages, handlerFunction, divId) {
	$('#' + divId).html('');
	var navElement = $('<nav/>', { class: 'text-centered' });
	var ulElement = $('<ul/>', { class:'pagination' });

	for(var i=0; i < pages; i++) {
		var liElement = $('<li/>')
			.html('<a onclick="' + handlerFunction + '(event)" href="#" class="page-search">' + (i+1) + '</a>');
		ulElement.append(liElement);
	}

	navElement.append(ulElement);
	$('#' + divId).append(navElement);
}

// Creates the movies widgets.
searchHandler.createMoviesResults = function (movies) {
	$('#movies-result-container').html('');
	movies.forEach(function (movie, index) {
		$('#movies-result-container').append(searchHandler.buildMovieWidget(movie));
	})
}

// Create each movie widget.
searchHandler.buildMovieWidget = function (movie) {
	var config = getConfiguration();
	var wrapper = $('<div/>', { class: 'col-sm-3 col-md-3' });
	var movieDiv = $('<div/>', { id: 'movie-' + movie.id, class: movie.adult ? 'red-background movie' : 'movie' });

	var movieImgContent = $('<div/>', { class: 'movie-poster-content' });
	var moviePosterUrl = '';
	if(movie['poster_path'] != null) {
		moviePosterUrl = config.images['base_url'] + config.images['poster_sizes'][2] + movie['poster_path'];
	}
	else {
		moviePosterUrl = 'img/noposter.jpg';
	}
	var imgElement = $('<img/>', { src: moviePosterUrl, class: 'img-movie' });
	var movieTitle = $('<div/>', { class: 'movie-title' })
		.html('<h4><center>' + movie.original_title + '<br/>(' + movie.release_date + ')' + '</center></h4>');
	movieImgContent.append(movieTitle);
	movieImgContent.append(imgElement);
	movieDiv.append(movieImgContent);

	var movieInformation = $('<div/>', { class: 'movie-content' });
	var moviePopularity = $('<div/>', { class: 'movie-popularity' }).html('popularity: ' + movie.popularity);
	var movieInformation = $('<div/>', { class: 'movie-resume' }).html(movie.overview);
	var movieButtons = $('<div/>', { class:'text-centered' })
		.html('<a onCLick="searchHandler.retrieveMovieInformation(event)" href="#" class="btn btn-primary" data-id="' + movie.id +'">More Info</a>')
	movieInformation.append(moviePopularity);
	movieInformation.append(movieInformation);
	movieDiv.append(movieInformation);
	movieDiv.append(movieButtons);

	wrapper.append(movieDiv);

	return wrapper;
}

// Creates persons panel if search returns more than just one result.
searchHandler.createPersonResults = function (persons) {
	$('#persons').html('');
	persons.forEach(function (person, index) {
		$('#persons').append(searchHandler.buildPersonButton(person));
	});
	showElement('persons');
}

// Creates a button for each person.
searchHandler.buildPersonButton = function (person) {
	var button = $('<button/>',
		{
			id: 'person-' + person.id,
			text: person.name + ' (' + person.popularity + ')',
			class: person.popularity > 10 ? 'btn btn-success person-btn' : 'btn btn-primary person-btn',
			click: function() { searchHandler.getMoviesByActorId(person.id) }
		});

	return button;
}

// Petition for the movies for an specific actor.
searchHandler.getMoviesByActorId = function (personId, pageNumber) {
	pageNumber = pageNumber == undefined ? '1' : pageNumber;
	searchHandler.currentPerson = personId;
	var send = { type: 'movies', person: personId, pageNumber: pageNumber };
	ajaxRequest.post(searchHandler.searchUrl, send, searchHandler.searchMoviesSuccess);

	var send2 = { type: 'actorInfo', person: personId };
	ajaxRequest.post(searchHandler.searchUrl, send2, searchHandler.actorInfoSuccess);
}

// Callback method for search movies by actor.
searchHandler.searchMoviesSuccess = function (result) {
	hideElement('persons-result');
	searchHandler.showResults(result);
}

// Petition to retrieve all actors that match with the typed text.
searchHandler.getActorsByName = function (value, pageNumber) {
	pageNumber = pageNumber == undefined ? '1' : pageNumber;
	var fixed = value.replace(' ', '+');
	var send = { type: 'actor', name: fixed, pageNumber: pageNumber };
	ajaxRequest.post(searchHandler.searchUrl, send, searchHandler.searchPersonSuccess);
}

// Callback method for retrieve actor info.
searchHandler.actorInfoSuccess = function (result) {
	$('#person-info').html('');
	var actorInfo = JSON.parse(result);
	var config = getConfiguration();
	var personPhoto = '';
	var titleLink = '<a href="' + searchHandler.imdbName + actorInfo.imdb_id + '" target="_blank">' + actorInfo.name + '</a>';

	$('#person-name').html(titleLink + '<br/>(' + actorInfo.place_of_birth + ')');

	if(actorInfo['profile_path']!= null) {
		personPhoto = config.images['base_url'] + config.images['poster_sizes'][2] + actorInfo['profile_path'];
	}
	else {
		personPhoto = 'img/noprofile.jpg';
	}

	$('#person-photo').attr('src', personPhoto);

	$('#person-info').append(actorInfo.biography);
}

// Method that handles the movies paginator.
searchHandler.searchMoviePage = function (event) {
	event.preventDefault();
	var targetPage = $(event.currentTarget).html();
	var person = searchHandler.findPersonInTemp(searchHandler.currentPerson);

	searchHandler.getMoviesByActorId(person.id, targetPage);
}

// Method that handle the actors paginator.
searchHandler.searchActorPage = function (event) {
	event.preventDefault();
	var targetPage = $(event.currentTarget).html();

	searchHandler.getActorsByName(searchHandler.getValue(), targetPage);
}

// Petition to retrieves information for a movie.
searchHandler.retrieveMovieInformation = function (event) {
	var movieId = $(event.currentTarget).data('id');
	var send = { type: 'movieInfo', movie: movieId };
	ajaxRequest.post(searchHandler.searchUrl, send, searchHandler.movieInfoSuccess);
}

// Callback method for retrieves movie information.
searchHandler.movieInfoSuccess = function (result) {
	var movieInfo = JSON.parse(result);
	var titleLink = '<a href="' + searchHandler.imdbTitle + movieInfo.imdb_id + '" target="_blank">';
	titleLink += movieInfo.original_title + ' (' + movieInfo.original_language + ')</a>';
	var connector = movieInfo.status == 'Planned' ? ' for ' : ' on ';
	var status = movieInfo.status + connector + movieInfo.release_date;
	var tagLine = movieInfo.tagline == '' ? 'No Tag' : movieInfo.tagline;
	var tagElement = '<small>"' + tagLine + '"</small>';
	$('#movie-info-title').html(titleLink + '<br/>' + tagElement + '<br/><small><span class="label label-primary">' + status + '</span></small>');
	var divGenres = '<div class="genres-movie">Genres:<br/>';
	movieInfo.genres.forEach(function (genre) {
		divGenres += '<button class="btn btn-primary person-btn">' + genre.name + '</button>';
	});
	divGenres += '</div>';
	$('#movie-info-body').html(movieInfo.overview + divGenres);
	$('#modal-movie-info').modal('show');
}

// Saves persons results temporally.
searchHandler.setTempPersons = function (persons) {
	return localStorage.setItem('TemporalPersons', JSON.stringify(persons));
}

// Gets temporally persons results.
searchHandler.getTempPersons = function () {
	return JSON.parse(localStorage.getItem('TemporalPersons'));
}

// Deletes the temporally results.
searchHandler.deleteTempPersons = function () {
	localStorage.removeItem('TemporalPersons');
}

// Search for a person in the temporally results.
searchHandler.findPersonInTemp = function (personId) {
	var result = null;
	var persons = searchHandler.getTempPersons();
	for(var i = 0; i < persons.length; i++) {
		if(persons[i].id == personId) {
			result = persons[i];
			break;
		}
	}

	return result;
}
