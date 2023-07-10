<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width">
 	<title>AtD Changes</title>

	<style>
		td { border: 1px solid #aaa; }
		body, td, h2 { font-family: sans-serif } 
	</style>
</head>
<body>
<?php
$docks = array();
$wps = array();

$excludeids = array("src", "#id", "100338", "200338", "300338", "400338", "500338", "600338", "700338", "800338", "900338", "100335", "200335", "300335", "400335");

$current = fopen('https://gladys.geog.ucl.ac.uk/bikesapi/load.php?scheme=london', 'r');
while ($row = fgetcsv($current))
{
	if (!in_array($row[0], $excludeids))
	{
 		$docks[$row[0]] = $row;
	}
}

$waypoints = fopen('https://raw.githubusercontent.com/oobrien/allthedocks/main/allthedocks_list.tsv', 'r');
while ($row = fgetcsv($waypoints, null, "\t"))
{
	if (!in_array($row[0], $excludeids))
	{
	 	$wps[$row[0]] = $row;
	}
}
?>

Data as at: 

<?php
	$ts = explode('|', $docks[1][1])[0];
	echo date('Y-m-d H:i:s', $ts);
?>. <a href='live.php'>Admin map/list</a>

<h2>Additions</h2>
<table>
<tr><th>TfL ID</th><th>Name</th><th>Lat</th><th>Lon</th><th>No of Bikes</th><th>No of Docks</th><th>Map</th></tr>
<?php 
foreach ($docks as $dock)
{
	if ($wps[$dock[0]] == null)
	{
		$map = "https://gladys.geog.ucl.ac.uk/staticmaplite/staticmap.php?zoom=14&size=240x240&maptype=mapnik&center=" . $dock[3] . "," . $dock[4] . "&markers=" . $dock[3] . "," . $dock[4] . ",lightblue1";
		echo "<tr><td>" . $dock[0] . "</td><td>" . $dock[2] . "</td><td>" . $dock[3] . "</td><td>" . $dock[4] . "</td><td>" . $dock[5] . "</td><td>" . $dock[10] . "</td><td><img src='" . $map . "'></td></tr>";	
	}
}
?>
</table>
<h2>Removals</h2>
<table>
<tr><th>TfL ID</th><th>Name</th><th>Shortcode</th><th>Team/Sequence</th></tr>
<?php 
foreach ($wps as $wp)
{
	if ($docks[$wp[0]] == null)
	{
		echo "<tr><td>" . $wp[0] . "</td><td>" . $wp[1] . "</td><td>" . $wp[4] . "</td><td>" . $wp[5] . "</td></tr>";	
	}
}
?>
</table>
<h2>Zero Total Docks Reported</h2>
<table>
<tr><th>TfL ID</th><th>Name</th><th>Shortcode</th><th>Team/Sequence</th></tr>
<?php 
foreach ($docks as $dock)
{
	if ($dock[10] < 1 && $wps[$dock[0]] != null)
	{
		echo "<tr><td>" . $wps[$dock[0]][0] . "</td><td>" . $wps[$dock[0]][1] . "</td><td>" . $wps[$dock[0]][4] . "</td><td>" . $wps[$dock[0]][5] . "</td></tr>";	
	}
}
?>
</table>
<h2>Relocations</h2>
<table>
<tr><th>TfL ID</th><th>Name</th><th>Shortcode</th><th>Team/Sequence</th><th>Old Lat</th><th>Old Lon</th><th>New Lat</th><th>New Lon</th><th>New Map</th></tr>
<?php 
foreach ($docks as $dock)
{
	$map = "https://gladys.geog.ucl.ac.uk/staticmaplite/staticmap.php?zoom=14&size=240x240&maptype=mapnik&center=" . $dock[3] . "," . $dock[4] . "&markers=" . $dock[3] . "," . $dock[4] . ",lightblue1";
	$latdiff = $wps[$dock[0]][2] - $dock[3];
	$londiff = $wps[$dock[0]][3] != $dock[4];
	if ($wps[$dock[0]] != null && ($londiff > 0.000001 || $latdiff > 0.000001))
	{
		echo "<tr><td>" . $wps[$dock[0]][0] . "</td><td>" . $wps[$dock[0]][1] . "</td><td>" . $wps[$dock[0]][4] . "</td><td>" . $wps[$dock[0]][5] . "</td><td>" . $wps[$dock[0]][2] . "</td><td>" . $wps[$dock[0]][3] . "</td><td>" . $dock[3] . "</td><td>" . $dock[4] . "</td><td><img src='" . $map . "'></td></tr>";	
	}
}
?>
</table>
<h2>Name Changes</h2>
<table>
<tr><th>TfL ID</th><th>Old Name</th><th>Shortcode</th><th>Team/Sequence</th><th>New Name</th></tr>
<?php 
foreach ($docks as $dock)
{
	if ($wps[$dock[0]] != null && $wps[$dock[0]][1] != str_replace('  ', ' ', str_replace('&amp;', '&', $dock[2])))
	{
		echo "<tr><td>" . $wps[$dock[0]][0] . "</td><td>" . $wps[$dock[0]][1] . "</td><td>" . $wps[$dock[0]][4] . "</td><td>" . $wps[$dock[0]][5] . "</td><td>" . $dock[2] . "</td></tr>";	
	}
}
?>
</table>

<h2>Full</h2>
<table>
<tr><th></th><th>West</th><th>South</th><th>Putney</th><th>North</th><th>East</th><th></th></tr>
<tr><td>
<?php 

$fulllist = [];

foreach ($docks as $dock)
{
	if ($dock[6] < 1 && $wps[$dock[0]] != null)
	{
		$fulllist[$wps[$dock[0]][5]] = $wps[$dock[0]][4];
	}
}


krsort($fulllist);
$currindex = "";

foreach($fulllist as $seq=>$shortcode)
{
	if ($currindex != $seq[0])
	{
		$currindex = $seq[0];
		echo "</td><td>";
	}
	echo $seq . "<br />";
}

?> 
</td></tr>
</table>
</body>
</html>

