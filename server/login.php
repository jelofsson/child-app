<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-type: text/json');
header('Content-type: application/json');
error_reporting(E_ALL);
//como esta pagina no devuelve nada, no tengo que usar html

extract($_GET);
include("inc/const.php");
include("inc/functions.php");
$sql = "SELECT * FROM usuarios WHERE usuario='$usuario' AND pass='$pass'";
$rs = ejecutarConsulta($sql);
$cantRegs = mysql_num_rows($rs);
if($cantRegs == 1) {
	//cada vez que se loguea se actualizan las cookiess
	$status;
	while($reg = mysql_fetch_assoc($rs)) {
		$status = $reg[status];
	}
	echo "{
		'usuario':'$usuario',
		'pass':'$pass',
		'status':'$status'
	}";

}
else {
	$error = "Error: password or username wrong, try again!";
	echo "{
	'error': \"$error\",
	'cantRegs': \"$cantRegs\",
	'rs': \"$rs\"
	}";
}

?>
