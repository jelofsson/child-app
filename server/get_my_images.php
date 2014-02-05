<?php

	// HEADER:s
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('Content-type: text/json'); 
	header('Content-type: application/json');

	include ("inc/const.php");
	include ("inc/functions.php");

	// CHECK THAT WE ARE OK:
	if( ! isset($_POST['user']) && ! isset($_GET['user']) )
	{
		echo json_encode(array(
			'success' => 'false', 
			'result' => null, 
			'error' => 'No user variable sent to function.'
		));
		die();
	}
	else 
	{
		$user = (isset($_POST['user'])) ? $_POST['user'] : $_GET['user'];	
	}

	// OK .. GO !	
	$list = Array();	
	$sql = "SELECT * FROM pictures WHERE usuario = '{$user}'"; // SQL 
	$rs = ejecutarConsulta($sql);
	$result = array();
	while($r = mysql_fetch_assoc($rs))
	{
		$result[] = Array(
			'location' 				=> $r['location'],
			'image' 					=> $r['location'],
			'image_datetime' 		=> $r['datetime_image'],
			'feedback' 				=> $r['feedback'],
			'feedback_datetime' 	=> $r['feedback_datetime']
		);
	}
	if(count($result) > 0)
	{
		echo json_encode(array(
			'success' => 'true', 
			'result' => $result
		));
	}
	else
	{
		echo json_encode(array(
			'success' => 'false', 
			'result' => null, 
			'error' => 'Didn´t find any pictures!'
		));
	}

?>
