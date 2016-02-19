<?php
require("configuration.php");
require("TMDBConnection.php");

$connection = new TMDBConnection();

echo $connection->generateConfiguration();

?>