<?php
	$image_folder = 'images/';
	// HEADER:s
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('Content-type: text/json'); 
	header('Content-type: application/json');
	
	// CHECK THAT WE ARE OK:
	if( ! isset($_POST['image']) && ! isset($_GET['image']) && ! isset($_POST['text']) && ! isset($_GET['text']))
	{
		echo json_encode(array('success' => 'false'));
	}
	else 
	{
		$text = (isset($_POST['text'])) ? $_POST['text'] : $_GET['text'];
		$image = (isset($_POST['image'])) ? $_POST['image'] : $_GET['image'];
		if(substr($image, 0, strlen($image_folder)) != $image_folder) // Check that we have image folder in string..
		{
			$image = $image_folder . $image; 
		}
	}
	
	// OK .. GO !	
	$list = Array();
	$sql = "SELECT * FROM pictures WHERE location='$image' LIMIT 0,1"; // SQL 
	$rs = ejecutarConsulta($sql);
	if(mysql_num_rows($rs) > 0)
	{
		$row = mysql_fetch_assoc($rs);
		$image = $row['location'];
		$datetime = datetime('Y-m-d H:i:s');
		$sql = "UPDATE pictures SET feedback = '$text' and datetime_feedback = '$datetime' WHERE location='$image'"; // SQL 
		$rs = ejecutarConsulta($sql);
		echo json_encode(array('success' => 'true'));
	}
	else
	{
		echo json_encode(array('success' => 'false'));
	}

?>