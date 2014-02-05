// <-----------------ON APPLICATION LOADED--------------------->
var usuario = "";
var status = "";
var fbType = 0;
var fbText = "";
var fbPicture = "";
$(document).ready(function () 
{	
	show_view('signin'); // Show the startup view.
});
// <-----------------------PHONEGAP---------------------->

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
// Do cool things here...
}

//Gets image form the library (set sourceType to PHOTOLIBRARY). Retrieve image file location in the phone (set destinationType to FILE_URI).
function getImage() {
	//navigator.camera.getPicture has 3 parameters, one function that triggers when succeed (uploadPhoto), one when failed (insede the code) and options (insede the code).
    navigator.camera.getPicture(uploadPhoto, function(message) {
    alert('get picture failed');
},{
    quality: 70, 
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 400,
    targetHeight: 400
}
    );

}

//Open the cammera of the phone (default sourceType, dont add it). Retrieve image file location in the phone (set destinationType to FILE_URI).
function captureImage() {
    navigator.camera.getPicture(uploadPhoto, function(message) {
    alert('capture picture failed');
},{
    quality: 70, 
    destinationType: navigator.camera.DestinationType.FILE_URI,
    targetWidth: 400,
    targetHeight: 400
}
    );

}

//If getImage or captureImage has failed see the navigator.camera.getPicture second parameter.
//Is triggered when getImage or captureImage has succeed.
//This fucntion sends the image jpeg to the php file.
function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    //FileTransfer() object allows you to upload or download files to and from a server.
    var ft = new FileTransfer();
    //If you want to upload set ft.upload, it has 5 parameters.
    //CUANDO ANDEN LAS COOKIES BORRAR MARTIN Y PONER EL USUARIO DE LA COOKIE.
    ft.upload(imageURI, server_host + "upload.php?usuario="+$('input#usuario').val(), win, fail, options);//Put your php file that changes the image to an other folder
    var show_picture = document.getElementById("show_picture");
    show_picture.src = imageURI;
}

//If uploadPhoto has succeed.
function win(r) {
	show_view('picture_uploaded');
	/*
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
    */
}

////If uploadPhoto has failed.
function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

//VIBRATES FOR HALF SECOND
//function vibrate() {
  //  navigator.notification.vibrate(500);
//}

// <----------- Handling the different views (JQUERY) ----------->
function show_view(name)
{
	 console.log('usuario='+usuario);
	 $('#waiting,#error').hide();
    $('.view').hide(); // Show the startup view.
    $('#view__' + name).show(); // Show the startup view.
    // -- Check for certain view functions: ----------------------
		switch (name){
			case "signin":
				$.removeCookie('usuario');
				$.removeCookie('pass');
				$.removeCookie('status'); 
			break;
			case "givefeedback_start":
				imageFeedback();
				setTimeout(clear_feedback(),1500);
			break;
			case "givefeedback_selection":
				get_feedback_list( fbType );
			break;
			case "my_images":
				viewImages($('input#usuario').val());
			break;
		}
    // -----------------------------------------------------------
}
// <--------- Feedback, selecting a feedback text-string: --------->
function select_feedback(e)
{
    fbType = fbType + 1;
    fbText = fbText + $(e).html()+' ';
    $('div#feedback_text').html(fbText);
    if(fbType<4)
    {
        $('div#feedback_text').html(fbText + '..');
        get_feedback_list( fbType );
        $('button#clear_feedback').show();
    }
    else
    {
        $('div#feedback_selection').html('');
        $('button#give_feedback').show();
    }
};
// clear feedback:
function clear_feedback()
{
	fbType = 0;
	fbText = '';
	get_feedback_list( fbType );
	$('div#feedback_text').html('');
	$('button#clear_feedback').hide();
	$('button#give_feedback').hide();
}
// <-----------------------OTHERS------------------------>












