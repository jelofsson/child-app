<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$picture_location = "http://xcalibur.zapto.org/kid-app/";
// $picture_location = "http://puertosur.com.ar/Martin/HI-kidsapp/";

include ("inc/const.php");
include ("inc/functions.php");

$sql = "SELECT `location` FROM `pictures` WHERE `feedback` = '0' ORDER BY `datetime_picture` ASC LIMIT 1";
$rs = ejecutarConsulta($sql);
$cantRegs = mysql_num_rows($rs);
if($cantRegs == 0) {
	echo "nopicture";
}
else {
	while($reg = mysql_fetch_assoc($rs)) {
		$picture_location = $picture_location.$reg[location];
		echo $picture_location;
	}
}

//$sql = "UPDATE pictures SET `feedback` = 1 WHERE `location` = `$picture_location`";
//$rs = ejecutarConsulta($sql);
?>
