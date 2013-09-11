//Funciones comunes a todas las consultas

function crearXMLHttpRequest() 
{
  var xmlHttp=null;
  if (window.ActiveXObject) 
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  else 
    if (window.XMLHttpRequest) 
      xmlHttp = new XMLHttpRequest();
  return xmlHttp;
}

//Funciones particulares
function savePhotoToDb(imageData) {
	var cad = 'imageData='+imageData;
	var conexion;
	conexion = crearXMLHttpRequest();
  	conexion.onreadystatechange = function()
		{
		  var resultado = document.getElementById("mesage");
		  if(conexion.readyState == 4 && conexion.status==200)
		  {
			resultado.innerHTML = conexion.responseText;
		  } 
		  else 
		  {
			resultado.innerHTML = "<div class='centrar'><img src ='images/ajax.gif' height='60px' width='auto' /></div>";
		  }
		}
	conexion.open("POST", "http://puertosur.com.ar/Martin/HI-kidsapp/savePhoto.php", true);
	conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	conexion.send(cad);
}


function signin(usuario = null, pass = null) {//If I call the function signin() then both parameters are null
	if(usuario == null && pass == null) {
		var usuario = document.getElementById("usuario").value;
		var pass = document.getElementById("pass").value;
	}	
	// LOGIN:
	$('div#waiting').html("<img src ='images/ajax.gif' />");
	$.post("http://puertosur.com.ar/Martin/HI-kidsapp/login.php", { usuario: usuario, pass: pass }).done(function(data) 
	{
		if(data.status != '') // We are good:
		{
			if(data.status == 'kid')
				show_view('take_picture');
			else if(data.status == 'grandma')
				show_view('givefeedback_start'); 
			else
				$('div#waiting').html( data.error );
		}
		else
		{
			$('div#waiting').html( data.error );
		}
	});
}

// GET FEEDBACK LIST:
function get_feedback_list(type)
{
	$('div#waiting').html("<img src ='images/ajax.gif' />");
	$.post("http://puertosur.com.ar/Martin/HI-kidsapp/feedback_list.php", { type: type }).done(function(data) 
	{
		if(typeof data.list != null)
		{
			// Load a UL-list with the result(json) from the AJAX:
			// ( This function is in-complete and not tested. )
			var ul_list = document.createElement('ul');
			for(item in data.list)
			{
				var a_item = document.createElement('a');
				$(a_item).attr('href','#');
				$(a_item).attr('onclick','select_feedback(this); return false;');
				$(a_item).addClass('feedback_item');
				$(a_item).html(data.list[item]);
				var li_item = document.createElement('li');
				$(li_item).html(a_item);
				ul_list.appendChild(li_item);
			}
			$('div#feedback_selection').html( ul_list );
		}
		else
		{
			$('div#feedback_selection').html('');
			$('div#waiting').html("Ops! something went wrong!");
			return false;
		}
	});
}
	

/*tualizarBuscador(categoria, pos) {
	var conexion;
	conexion = crearXMLHttpRequest();
  	conexion.onreadystatechange = function()
		{
		  var resultado = document.getElementById("contenido");
		  if(conexion.readyState == 4 && conexion.status==200)
		  {
			resultado.innerHTML = conexion.responseText;
		  } 
		  else 
		  {
			resultado.innerHTML = "<div class='centrar'><img src ='themes/images/ajax_loader_red.gif' height='60px' width='auto' /></div>";
		  }
		}
	if (categoria == null) {
		var categoria = document.getElementById("search").value;
	}
  	conexion.open("GET", "http://yasejuega.com/m/mostrarContenido.php?categoria="+categoria+"&pos="+pos, true);
	conexion.send(null);
}
*/
