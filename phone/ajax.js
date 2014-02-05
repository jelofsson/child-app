var server_host = "http://www.jelofsson.se/kid-app/";
// var server_host = "http://puertosur.com.ar/Martin/HI-kidsapp/";

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
	conexion.open("POST", server_host+"savePhoto.php", true);
	conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	conexion.send(cad);
}

function signin(usuario, pass) {
	$('#waiting').show();
	var conexion;
	conexion = crearXMLHttpRequest();
  	conexion.onreadystatechange = function()
		{
		  $('#waiting').hide();
		  if(conexion.readyState == 4 && conexion.status==200) {
		  		var datos=eval("(" + conexion.responseText + ")");
				if(datos.status == "kid") {
					$.cookie('usuario', datos.usuario, {path: server_host });
					$.cookie('pass', datos.pass, {path: server_host });
					$.cookie('status', datos.status, {path: server_host });
					usuario = datos.usuario;
					status = datos.status;
					show_view('take_picture');
				}
				else if (datos.status == "grandma") {
					$.cookie('usuario', datos.usuario, {path: server_host });
					$.cookie('pass', datos.pass, {path: server_host });
					$.cookie('status', datos.status, {path: server_host });
					usuario = datos.usuario;
					status = datos.status;
					show_view('givefeedback_start');
				}
				else {
					$('#error').html(datos.error).show();
				}
		  }
		}
  	conexion.open("GET", server_host + "login.php?usuario="+usuario+"&pass="+pass, true);
	conexion.send(null);
}


//GET THE SRC OF THE PICTURE TO GIVE FEEDBACK
function imageFeedback() {
	var conexion2;
	conexion2 = crearXMLHttpRequest();
  	conexion2.onreadystatechange = function()
		{
		  var image_feedback = document.getElementById("image_feedback");
		  if(conexion2.readyState == 4 && conexion2.status==200) {
				if(conexion2.responseText == "nopicture") {
					//var no_pictures = document.getElementById("no_pictures");
					//no_pictures.style.display = "absolute";
					$('#no_pictures').show();
					$('#hide_no_image').hide();
					$('#image_feedback').hide();
				}
				else {
					image_feedback.src = conexion2.responseText;
					fbPicture = conexion2.responseText;
				}
				$('#waiting').hide();
		  } 
		  else 
		  {
			$('#waiting').show();
		  }
		}
  	conexion2.open("GET", server_host + "getpicture.php", true);
	conexion2.send(null);
}

// GET FEEDBACK LIST:
function get_feedback_list(type)
{
	$('#waiting').show();
	$('div#feedback_selection').css('visibility', 'hidden');
	$.post(server_host + "feedback_list.php", { type: type }).done(function(data) 
	{
		if(typeof data.list != null)
		{
			// Load a UL-list with the result(json) from the AJAX:
			// ( This function is in-complete and not tested. )
			var ul_list = document.createElement('ul');
			var odd_even = 0;
			for(item in data.list)
			{
				var a_item = document.createElement('a');
				$(a_item).attr('href','#');
				$(a_item).attr('onclick','select_feedback(this); return false;');
				$(a_item).addClass('feedback_item');
				$(a_item).html(data.list[item]);
				var li_item = document.createElement('li');
				$(li_item).addClass((odd_even%2 == 0) ? 'even' : 'odd');
				$(li_item).html(a_item);
				ul_list.appendChild(li_item);
				odd_even = odd_even +1;
			}
			$('#waiting').hide();
			$('div#feedback_selection').html( ul_list );
			$('div#feedback_selection').css('visibility', 'visible');
			return true;
		}
		else
		{
			$('div#feedback_selection').html('');
			$('div#feedback_selection').css('visibility', 'visible');
			$('div#error').html("Ops! something went wrong!").show();
			return false;
		}
		$('div#feedback_selection').append("<button onclick=\"show_view('take_picture');\">Go back</button>");
	});
}

// SAVE FEEDBACK TO LIST:
function set_feedback_to_image(image,text)
{
	$('div#waiting').show();
	$.post(server_host + "set_feedback_to_image.php", { image: image, text: text }).done(function(data) 
	{
		if(data.success == "true")
		{
			show_view('givefeedback_start');
		}
		else
		{
			$('div#error').html('Error while saving picture feedback!').show();
			$('div#waiting').hide();
		}
	});
}

//CREATE A USER IN THE DB
function createUser (whoareyou) {
	var conexion;
	conexion = crearXMLHttpRequest();
	var errors = document.getElementById("validation");
  	var cUsario = document.getElementById("create_usuario").value;
  	var cPass = document.getElementById("create_pass").value;
	$('#waiting').show();
  	conexion.onreadystatechange = function()
	{
		  if(conexion.readyState == 4 && conexion.status==200) {
			if(conexion.responseText == "kid") {
				$.cookie('usuario', datos.usuario);
				$.cookie('pass', datos.pass);
				$.cookie('status', datos.status);
				show_view('take_picture');	
			}
			else if(conexion.responseText == "grandma") {
				$.cookie('usuario', datos.usuario);
				$.cookie('pass', datos.pass);
				$.cookie('status', datos.status);
				show_view('givefeedback_start');	
			}
			else {
				$('#error').html(conexion.responseText).show();
			}
		  }
		  $('#waiting').hide();
		}
  	conexion.open("GET", server_host + "create_user.php?usuario="+cUsario+"&pass="+cPass+"&status="+whoareyou, true);
	conexion.send(null);
}

//LOAD ALL IMAGES FROM A USER
function viewImages(user) {
	$.post(server_host + "get_my_images.php", { user: user }).done(function(data)
	{
		$('div#view__my_images').html('');
		if( data.success == "true" )
		{
			var odd_even = 0;
			for(i in data.result)
			{
				div_item = document.createElement('div');
				$(div_item).addClass('image_container');
				$(div_item).addClass((odd_even%2 == 0) ? 'even' : 'odd');
				img_item = document.createElement('img');
				$(img_item).addClass('picture');
				$(img_item).attr('src', server_host + data.result[i].location);
				div_item.appendChild(img_item);

				if(data.result[i].feedback != '0')
				{
					span_item = document.createElement('p');
					$(span_item).html(data.result[i].feedback);
					div_item.appendChild(span_item);
					$(div_item).addClass('has_feedback');
				}
				$('div#view__my_images').append(div_item);
				odd_even = odd_even+1;
			}
			btn_item = document.createElement('button');
			$(btn_item).attr("onclick", "show_view('take_picture')").html('Go Back!');
			$('div#view__my_images').append(btn_item);
		}
		else
		{
			$('div#error').html(data.error).show();
			btn_item = document.createElement('button');
			$(btn_item).attr("onclick", "show_view('take_picture')").html('Go Back!');
			$('div#view__my_images').append(btn_item);
		}
	});
}





