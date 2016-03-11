<?php
/*
 * Year: 2016
 * Author: Danny Steven Salazar Mazo
 *
 * This file performs all related search queries.
 */
date_default_timezone_set('UTC');
require("TMDBConnection.php");

$result = '';
$searchCriteria = '';
$elements = array();

if(!isset($_POST['type'])) {
	$postData = file_get_contents("php://input");
	$elements = resolveElementsForAngular($postData);
}
else {
	$elements['type'] = $_POST['type'];
}

$connection = new TMDBConnection();

switch ($elements['type']) {
	case 'actor':
		$searchCriteria =  isset($_POST['name']) ? $_POST['name'] : $elements['name'];
		$pageNumber =  isset($_POST['pageNumber']) ? $_POST['pageNumber'] : $elements['pageNumber'];
		$result = $connection->searchByName($searchCriteria, $pageNumber);
		break;
	case 'movies':
		$searchCriteria =  isset($_POST['person']) ? $_POST['person'] : $elements['person'];
		$pageNumber =  isset($_POST['pageNumber']) ? $_POST['pageNumber'] : $elements['pageNumber'];
		$result = $connection->searchMoviesByActorId($searchCriteria, $pageNumber);
		break;
	case 'actorInfo':
		$searchCriteria =  isset($_POST['person']) ? $_POST['person'] : $elements['person'];
		$result = $connection->searchActorInfo($searchCriteria);
		break;
	case 'movieInfo':
		$searchCriteria =  isset($_POST['movie']) ? $_POST['movie'] : $elements['movie'];
		$result = $connection->searchMovieInfo($searchCriteria);
		break;
	case 'configuration':
		$result = $connection->generateConfiguration();
		break;
	default:
		break;
}

echo $result;

function resolveElementsForAngular($data) {
	return json_decode($data, true);
}

?>
