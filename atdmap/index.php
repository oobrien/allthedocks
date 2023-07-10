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
	<script type="text/javascript">
	</script>
</head>
<body>
    <div id="mapcontainer"></div>
    <select id="segmentchooser" onchange="filter()"><option id="all">All Stages</option></select>
    <div id="scoreboard">
    	<table><tr>
    	<th id='sbtW'>W</th><td id='sbW'>...</td>
    	<th id='sbtP'>P</th><td id='sbP'>...</td>
    	<th id='sbtS'>S</th><td id='sbS'>...</td>
    	<th id='sbtN'>N</th><td id='sbN'>...</td>
    	<th id='sbtE'>E</th><td id='sbE'>...</td>
    	</tr></table>
    </div>
       <div id='link' style='bottom: 20px;'>See also: <a href="https://allthedocks.com/">Main All the Docks website</a> - <a href='https://observablehq.com/@jwolondon/all-the-docks'>Jo Wood Live Visualisation</a> - <a href="https://github.com/oobrien/allthedocks">Github repo (GPX route files + dock list)</a></div>

</body>
</html>


