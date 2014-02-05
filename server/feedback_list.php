<?php
	include ("inc/const.php");
	include ("inc/functions.php");
	// HEADER:s
	header('Access-Control-Allow-Origin: *'); 
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('Content-type: text/json'); 
	header('Content-type: application/json');
	
	// CHECK THAT WE ARE OK:
	if( ! isset($_POST['type']) && ! isset($_GET['type']))
	{
		return FALSE;
	}
	else 
	{
		$type = (isset($_POST['type'])) ? $_POST['type'] : $_GET['type'];
	}
	
	// OK .. GO !	
	$list = Array();
	$sql = "SELECT * FROM feedback_questions WHERE type='$type' ORDER BY RAND()"; // SQL 
	$rs = ejecutarConsulta($sql);
	while($reg = mysql_fetch_assoc($rs))
	{
		$list[] = $reg['text']; 
	}
	echo json_encode(array('list' => $list));

?>