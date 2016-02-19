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
$type = !isset($_POST['type']) ? 'actor' : $_POST['type'];
$searchCriteria = '';

$connection = new TMDBConnection();

switch ($type) {
	case 'actor':
		$searchCriteria =  $_POST['name'];
		$pageNumber =  $_POST['pageNumber'];
		$result = $connection->searchByName($searchCriteria, $pageNumber);
		break;
	case 'movies':
		$searchCriteria =  $_POST['person'];
		$pageNumber =  $_POST['pageNumber'];
		$result = $connection->searchMoviesByActorId($searchCriteria, $pageNumber);
		break;
	case 'actorInfo':
		$searchCriteria =  $_POST['person'];
		$result = $connection->searchActorInfo($searchCriteria);
		break;
	case 'movieInfo':
		$searchCriteria =  $_POST['movie'];
		$result = $connection->searchMovieInfo($searchCriteria);
		break;
	case 'configuration':
		$result = $connection->generateConfiguration();
		break;
	default:
		break;
}

echo $result;

?>
