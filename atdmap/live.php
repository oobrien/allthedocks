<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
 	<title>All the Docks LIVE</title>

	<link rel="stylesheet" type="text/css" media="screen" href="style.css" />	
	<link rel="stylesheet" type="text/css" media="all" href="https://lib.oomap.co.uk/openlayers/v7.4.0-dist/ol.css" />	

 	<script type="text/javascript" src="https://lib.oomap.co.uk/jquery/jquery-3.5.1.js"></script>	     
    <script type="text/javascript" src="https://lib.oomap.co.uk/openlayers/v7.4.0-dist/ol.js"></script> 
	<script type="text/javascript" src="main.js"></script>
	<script type="text/javascript" src="live.js"></script>
</head>
<body>
    <div id="mapcontainer" style='bottom: 200px;'></div>
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
    <div id='link'><span>Fot teams use only.</span> </span> <a href='/'>Public map</a> - <a href='https://github.com/oobrien/allthedocks'>GPX files</a> - <a href='diff.php'>Late changes</a></div>
	<div id="list">
	 <table>
		<tr id='ltrow'><th id='ltW'>WEST</th><th id='ltP'>PUTNEY</th><th id='ltS'>SOUTH</th><th id='ltN'>NORTH</th><th id='ltE'>EAST</th></tr>
		<tr>
		<td id='westlist'></td>
		<td id='putneylist'></td>
		<td id='southlist'></td>
		<td id='northlist'></td>
		<td id='eastlist'></td>
		</tr>
		</table>	
	</div>   
</body>
</html>

