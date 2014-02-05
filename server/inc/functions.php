<?php

//funcion para conectarme a MySQL
function ejecutarConsulta($sql) {
	@$link = mysql_connect(SERVER,USER,PASSWORD);
	if ( ! $link) {
	    die("{ 'error': 'Could not connect: " . mysql_error() . "', 'server': '" . SERVER . "' }");
	}
	@mysql_select_db(LABASE);
	@$rs = mysql_query($sql,$link);
	@mysql_close($link);
	return $rs; //si falla algo me devuelve falso, por eso apo los errores con @. Si es un SELECT me muestra los datos, si es un INSERT INTO, UPDATE o DELETE me devuelve un booleano
}

function checkPass($pass) {
	if(empty ($pass)){
		return 1;
	}
	if(strlen($pass)<6) {
		return 2;
	}
	return 0;
}

function existeUsuario ($usuario) {
	@$link = mysql_connect(SERVER,USER,PASSWORD);
	@mysql_select_db(LABASE);
	$sql = "SELECT pass FROM usuarios WHERE usuario='$usuario'";
	@$rs = mysql_query($sql,$link);
	@mysql_close($link);
	return (mysql_num_rows($rs)>0);
}

?>
