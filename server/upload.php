<?php

include ("inc/const.php");
include ("inc/functions.php");

$picture_location = "/var/www/kid-app/images/";
// $picture_location = "/home/puertosu/public_html/Martin/HI-kidsapp/images/";

$usuario = $_GET["usuario"];
date_default_timezone_set(ZONAHORARIA);
$dateTime = date("Y-m-d H:i:s");

//IMPORTANTE: Permiso de la carpeta images en 777
print_r($_FILES);
$new_image_name = $usuario.md5(rand(0,1000)).".jpg";
move_uploaded_file($_FILES["file"]["tmp_name"], $picture_location . $new_image_name);

$sql = "INSERT INTO pictures (usuario, location, feedback, datetime_picture, datetime_feedback) VALUES ('$usuario', 'images/$new_image_name', 0, '$dateTime', 0)";
$rs = ejecutarConsulta($sql);
?>
