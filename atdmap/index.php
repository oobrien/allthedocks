<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
 	<title>All the Docks</title>

	<link rel="stylesheet" type="text/css" media="screen" href="style.css" />	
	<link rel="stylesheet" type="text/css" media="all" href="https://lib.oomap.co.uk/openlayers/v7.4.0-dist/ol.css" />	

 	<script type="text/javascript" src="https://lib.oomap.co.uk/jquery/jquery-3.5.1.js"></script>	     
    <script type="text/javascript" src="https://lib.oomap.co.uk/openlayers/v7.4.0-dist/ol.js"></script> 
	<script type="text/javascript" src="main.js"></script>
</head>
<body>
    <div id="mapcontainer"></div>
    <select id="segmentchooser" onchange="filter()"><option id="all">All</option></select>
</body>
</html>
