<?php

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
		$dateTime = date("Y-m-d H:i:s");
		$text = (isset($_POST['text'])) ? $_POST['text'] : $_GET['text'];
		$image = (isset($_POST['image'])) ? $_POST['image'] : $_GET['image'];
		$image = array_pop(explode('/', $image));
	}
	
	// OK .. GO !	
	$list = Array();	
	$sql = "UPDATE pictures SET feedback = '{$text}' AND datetime_feedback = '{$dateTime}' WHERE location like '%{$image}'"; // SQL 
	$rs = ejecutarConsulta($sql);
	echo json_encode(array('success' => 'true'));

?>