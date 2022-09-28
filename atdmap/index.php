<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
 	<title>All the Docks</title>

	<link rel="stylesheet" type="text/css" media="screen" href="style.css?t=<?php echo time(); ?>" />	
	<link rel="stylesheet" type="text/css" media="all" href="https://lib.oomap.co.uk/openlayers/v6.15.1-dist/ol.css" />	

    <script type="text/javascript" src="https://lib.oomap.co.uk/openlayers/v6.15.1-dist/ol.js"></script> 
	<script type="text/javascript" src="main.js?t=<?php echo time(); ?>"></script>
</head>
<body onload="init()">
    <div id="mapcontainer"></div>
    <select id="segmentchooser" onchange="filter()"><option id="all">All</option></select>
</body>
</html>

