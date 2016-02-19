<?php
/*
 * Year: 2016
 * Author: Danny Steven Salazar Mazo
 *
 * This class handle all calls to TMDb API.
 */
class TMDBConnection
{
	/* Key provided by TMDb to get access to its methods.*/
	const API_KEY = "108adf66fe2260f3a077fe0fc6ec68ff";

	/* Base url where the methods are located.*/
	const BASE_URL = "http://api.themoviedb.org/3/";

	/* To save the initial configuration from TMDb.*/
	var $configuration = '';

	/* Class constructor.*/
	function __construct() { }

	/** This method retrieves the initial TMDb configuration, for general purposes. */
	function generateConfiguration()
	{
		return $this->curlTo('configuration');
	}

	/**
	 * This method performs a search by person name in TMDb API.
	 *
	 * @param  string $name       The name to be searched (i.e angelina+jolie).
	 * @param  string $pageNumber The number of the page to be retrieved.
	 * @return Json string        A Json string with the results.
	 */
	function searchByName($name, $pageNumber)
	{
		$config = array('query' => $name, 'page' => $pageNumber);
		return $this->curlTo('search/person', $config);
	}

	/**
	 * Performs a movies search by actor's id (in chronological order).
	 *
	 * @param  string $actorId    The id for the actor.
	 * @param  string $pageNumber The number of the page to be retrieved.
	 * @return Json string        A Json string with the results.
	 */
	function searchMoviesByActorId($actorId, $pageNumber)
	{
		$config = array('sort_by' => 'release_date.desc', 'with_cast' => $actorId, 'page' => $pageNumber);
		return $this->curlTo('discover/movie', $config);
	}

	/**
	 * Retrieves person information (actor).
	 *
	 * @param  string $actorId The id for the person.
	 * @return Json string     A Json string with the results.
	 */
	function searchActorInfo($actorId)
	{
		return $this->curlTo('person/'.$actorId);
	}

	/**
	 * Retrieves movie information
	 * @param  string $movieId The id for the person
	 * @return Json string     A Json string with the results.
	 */
	function searchMovieInfo($movieId)
	{
		return $this->curlTo('movie/'.$movieId);
	}

	/**
	 * Method that use the curl library to perform requests to the TMDb API.
	 *
	 * @param  string $spaceName the name for the route to be used (API namespaces).
	 * @param  Array  $arguments An array that contains the extra-parameters to be used in the requests.
	 * @return Json string        A Json string with the results.
	 */
	function curlTo($spaceName, $arguments = null)
	{
		$urlExtraArguments = '';

		if($arguments != null)
		{
			foreach($arguments as $paramName=>$paramValue)
			{
				$urlExtraArguments .= '&' . $paramName . '=' . $paramValue;
			}
		}

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, self::BASE_URL . $spaceName . '?api_key=' . self::API_KEY . $urlExtraArguments);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);

		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		  "Accept: application/json"
		));

		$response = curl_exec($ch);
		curl_close($ch);


		return $response;
	}

}

?>
