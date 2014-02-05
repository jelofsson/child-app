<?php
	error_reporting(E_ALL);
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('Content-type: text/json'); 
	header('Content-type: application/json');

	include ("inc/const.php");
	include ("inc/functions.php");

	// CHECK THAT WE ARE OK:
	extract($_POST);
	$image = array_pop(explode('/', $image)); //Gives me the last part of the URL

	date_default_timezone_set(ZONAHORARIA);
	$dateTime = date("Y-m-d H:i:s");
	$text		 = str_replace("'", '', $text); // Important

	$sql = "UPDATE `pictures` SET `feedback` = '$text', `datetime_feedback` = '$dateTime' WHERE `location` like '%{$image}'"; 
	$rs = ejecutarConsulta($sql);
	
	 
	$rs = ejecutarConsulta("SELECT * FROM `pictures` WHERE `location` like '%{$image}'");
	$rs = mysql_fetch_assoc($rs);
	
	$success = (strlen($rs['feedback'])>1) ? 'true' : 'false';	
	echo json_encode(array('success' => $success, 'sql' => $sql));
?>