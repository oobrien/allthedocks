<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
 	<title>All the Docks LIVE</title>

	<link rel="stylesheet" type="text/css" media="screen" href="style.css" />	
	<link rel="stylesheet" type="text/css" media="all" href="https://lib.oomap.co.uk/openlayers/v6.15.1-dist/ol.css" />	

 	<script type="text/javascript" src="https://lib.oomap.co.uk/jquery/jquery-3.5.1.js"></script>	     
    <script type="text/javascript" src="https://lib.oomap.co.uk/openlayers/v6.15.1-dist/ol.js"></script> 
	<script type="text/javascript" src="main.js"></script>
	<script type="text/javascript" src="live.js"></script>
</head>
<body onload="init()">
    <div id="mapcontainer" style='bottom: 200px;'></div>
    <select id="segmentchooser" onchange="filter()"><option id="all">All</option></select>
    <div id='link'><a href='diff.php'>Late changes</a></div>
	<div id="list">
	 <table>
		<tr><th>WEST</th><th>SOUTH</th><th>EAST</th></tr>
		<tr>
		<td id='westlist'></td>
		<td id='southlist'></td>
		<td id='eastlist'></td>
		</tr>
		</table>	
	</div>   
</body>
</html>

