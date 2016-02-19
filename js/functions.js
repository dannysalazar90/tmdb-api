$(document).ready(function() {
	var actorName = $('#actor-name');
	$('#clear-search').click(clearSearch);
	$('.page-search').click(searchHandler.searchOtherPage);
	actorName.keyup(searchHandler.handleChangeEvent);
	if(actorName.val() == '') {
		showMessage('Please write something first!');
	}
	ajaxRequest.post('php/getConfiguration.php', {}, saveConfiguration);
})

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

function saveConfiguration (config) {
	localStorage.setItem('TMDBConfiguration', config);
}

function getConfiguration () {
	var configString = localStorage.getItem('TMDBConfiguration');

	return JSON.parse(configString);
}

function hideElement (elementId, velocity) {
	velocity = velocity == undefined ? 'slow' : velocity;
	$('#' + elementId).hide(velocity);
}

function showElement (elementId, velocity) {
	velocity = velocity == undefined ? 'slow' : velocity;
	$('#' + elementId).show(velocity);
}

function clearSearch() {
	$('#actor-name').val('');
	showMessage('Please write something first!');
	hideElement('results');
	hideElement('persons');
}
