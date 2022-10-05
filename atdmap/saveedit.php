<?php 

include 'db.php';

// Get $id_token via HTTPS POST.
$tfl_id = $_POST['tfl_id'];
$tfl_id = intval($tfl_id);
$visited = $_POST['visited'];
$visited = intval($visited);

$conn = mysqli_connect($dbhost, $dbwriteuser, $dbwritepass);
mysqli_set_charset($conn, "utf8");

if (!$conn) 
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to connect to the database.'));
		return false;
}

$tfl_id = mysqli_real_escape_string($conn, $tfl_id);

mysqli_select_db($conn, $dbdb);

if (!is_numeric($tfl_id) || !is_numeric($visited))
{
		echo json_encode(array('success'=>false, 'message'=>'Input must be integer.'));
		return false;	
}

$query1 = "SELECT visited from allthedocks where tfl_id = $tfl_id;";
$result1 = mysqli_query($conn, $query1);
if (!$result1)
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to check existing result.', 'query'=>$query1 ));
		return false;	
}
$rowcount = mysqli_num_rows($result1);
if ($rowcount == 0)
{
	echo json_encode(array('success'=>false, 'message'=>'Unknown system ID.' ));
	return false;			
}
else
{
	//$oldval = mysqli_fetch_row($result1)[0];

	$query2 = "";
	//if ($oldval != NULL) 
	if ($visited == 0)
	{
		$query2 = sprintf("update allthedocks set visited = NULL where tfl_id = %d", $tfl_id);
		$query3 = sprintf("insert into allthedocks_log values(%d, 'unvisited', NOW(), '%s', null)", $tfl_id, $_SERVER['HTTP_USER_AGENT']); 
	}
	else
	{
		$query2 = sprintf("update allthedocks set visited = NOW() where tfl_id = %d", $tfl_id);
		$query3 = sprintf("insert into allthedocks_log values(%d, 'visited', NOW(), '%s', null)", $tfl_id, $_SERVER['HTTP_USER_AGENT']); 	
	}
}

$result2 = mysqli_query($conn, $query2);
if (!$result2)
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to update row with new value.', 'query'=>$query2));
		return false;			
}
$result3 = mysqli_query($conn, $query3);
if (!$result3)
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to update changelog.', 'query'=>$query3));
		return false;			
}

echo json_encode(array('success'=>true, 'message'=>'Update successfully completed.', 'tfl_id'=>$tfl_id));
return true;

?>