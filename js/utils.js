/**
 * Year: 2016
 * Author: Danny Salazar
 *
 * This file contains util functions.
 */

// Setup method.
$(document).ready(function() {
  $('#actor-name').keyup(searchHandler.handleChangeEvent);
	$('#clear-search').click(clearSearch);

	ajaxRequest.post('php/search.php', { type: 'configuration' }, saveConfiguration);
})

// Handles the click on the clear button, hiding all panels.
function clearSearch() {
  $('#actor-name').val('');
  showMessage('Please write something first!');
  hideElement('results');
  hideElement('persons');
}

// Saves configuration in client-side.
function saveConfiguration (config) {
	localStorage.setItem('TMDBConfiguration', config);
}

// Gets the configuration from the client-side.
function getConfiguration () {
	var configString = localStorage.getItem('TMDBConfiguration');

	return JSON.parse(configString);
}

// Hide elements by id.
function hideElement (elementId, velocity) {
	velocity = velocity == undefined ? 'slow' : velocity;
	$('#' + elementId).hide(velocity);
}

// Show elements by id
function showElement (elementId, velocity) {
	velocity = velocity == undefined ? 'slow' : velocity;
	$('#' + elementId).show(velocity);
}

// Shows a message in the top of the page.
function showMessage (messageText, messageType) {
  var messages = $('#messages');
  var extraClasses = 'text-centered';
  messages.empty();
  messages.removeClass();
  switch (messageType) {
    case 'success':
          messages.addClass('alert alert-success alert-dismissible');
          break;
    case 'danger':
          messages.addClass('alert alert-danger alert-dismissible');
          break;
    default:
          messages.addClass('alert alert-warning alert-dismissible');
          break;
  }

  messages.addClass(extraClasses);

  messages.append(messageText);
  showElement('messages');
}
