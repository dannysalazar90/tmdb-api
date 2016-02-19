<?php
/**
* 
*/
class TMDBConnection
{
	const API_KEY = "108adf66fe2260f3a077fe0fc6ec68ff";
	const BASE_URL = "http://api.themoviedb.org/3/";

	var $configuration = '';

	function __construct()
	{
		//$this->configuration = $this->generateConfiguration();
	}

	function generateConfiguration()
	{
		return $this->curlTo('configuration');
	}

	function searchByName($name)
	{
		$config = array('query' => $name);
		return $this->curlTo('search/person', $config);
	}

	function searchMoviesByActorId($actorId, $pageNumber)
	{
		$config = array('sort_by' => 'release_date.desc', 'with_cast' => $actorId, 'page' => $pageNumber);
		return $this->curlTo('discover/movie', $config);
	}

	function searchActorInfo($actorId)
	{
		return $this->curlTo('person/'.$actorId);
	}

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