<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include ("inc/const.php");
include ("inc/functions.php");

extract($_GET);

$errors = "";
if(empty($status)) {
	echo "Fatal error: we don't know how are you!";
	die;
}
if(empty($usuario) or empty($pass)) {
	$errors = "Insert a user and pasword".SALTOLINEA;
}
if(existeUsuario($usuario)) {
	$errors.="This user already exists. Chose other one!".SALTOLINEA;
}
switch(checkPass($pass)) {
	case 1:
		$errors .= "The password can't be null".SALTOLINEA;
		break;
	case 2:
		$errors .= "Password must have at least 6 characters".SALTOLINEA;
		break;
}
if(!empty($errors)) {
	echo $errors;
}
else {
	$sql = "INSERT INTO `usuarios`(`usuario`, `pass`, `status`) VALUES ('$usuario', '$pass', '$status')";
	$rs = ejecutarConsulta($sql);

	setcookie("usuario", $usuario, time()+60*60*24*7);
	setcookie("pass", $pass, time()+60*60*24*7);
	setcookie("status", $status, time()+60*60*24*7);

	if($status == "kid") echo "kid";
	if($status == "grandma") echo "grandma";
}
?>
