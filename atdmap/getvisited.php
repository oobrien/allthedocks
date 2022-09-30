<?php

include 'db.php';
	
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
mysqli_set_charset($conn, "utf8");

if (!$conn) 
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to connect to the database.'));
}

mysqli_select_db($conn, $dbdb);

$query1 = "SELECT tfl_id, date_format(visited, '%H:%i'), left(seqcode, 1) FROM allthedocks WHERE visited is not null;";
$result1 = mysqli_query($conn, $query1);
if (!$result1)
{
		echo json_encode(array('success'=>false, 'message'=>'Unable to get data.'));
}

if (mysqli_num_rows($result1) == 0)
{
        echo json_encode(array('success'=>false, 'message'=>'No rows found in table.'));
}
else
{
		$rows = array();
		while ($row = mysqli_fetch_array($result1, MYSQLI_NUM))
		{
            $rows[] = $row;
    	}
    	
        $returnData = array('success'=>true, 'message'=>'', 'result'=>$rows);        
    	echo json_encode($returnData, JSON_NUMERIC_CHECK);   	
}
?>
