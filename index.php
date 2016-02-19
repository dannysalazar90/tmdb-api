<!DOCTYPE html>
<html>
<head>
	<title>ConsultApp Movies</title>
	<meta charset="UTF-8">
	<link href="third-party/css/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="third-party/css/nprogress/nprogress.css" rel="stylesheet">
	<link href="styles/main.css" rel="stylesheet">
</head>
<body>
	<div class="" role="alert" id="messages"></div>
	<div class="well">
		<div class="row text-centered">
			<div class="col-md-6 col-centered">
				<div class="form-group">
				    <label for="actor-name">Actor's Name:</label>
					<div class="input-group">
						<input type="text" class="form-control" id="actor-name" placeholder="Actor's name and press enter">
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" id="clear-search">Clear</button>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="row" id="persons">
		</div>
		<div class="row" id="results">
			<div class="col-md-4" id="person-result">
				<img src="" alt="" id="person-photo" />
				<div id="person-info"></div>
			</div>
			<div class="row col-md-8" id="movies-result">
				<div id="movies-result-title"></div>
				<div id="movies-result-paginator"></div>
				<div id="movies-result-container"></div>
			</div>
		</div>
	</div>

	<script src="third-party/js/jquery/jquery-1.11.3.min.js"></script>
	<script src="third-party/js/bootstrap/bootstrap.min.js"></script>
	<script src="third-party/js/nprogress/nprogress.js"></script>
	<script src='js/functions.js'></script>
	<script src='js/ajaxRequest.js'></script>
	<script src='js/searchHandler.js'></script>
</body>
</html>