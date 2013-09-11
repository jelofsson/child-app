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
    quality: 50, 
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 100,
    targetHeight: 100
}
    );

}

//Open the cammera of the phone (default sourceType, dont add it). Retrieve image file location in the phone (set destinationType to FILE_URI).
function captureImage() {
    navigator.camera.getPicture(uploadPhoto, function(message) {
    alert('capture picture failed');
},{
    quality: 50, 
    destinationType: navigator.camera.DestinationType.FILE_URI,
    targetWidth: 100,
    targetHeight: 100
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
    ft.upload(imageURI, "http://puertosur.com.ar/Martin/HI-kidsapp/upload.php", win, fail, options);//Put your php file that changes the image to an other folder
}

//If uploadPhoto has succeed.
function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert(r.response);
}

////If uploadPhoto has failed.
function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

// <-----------------------JQUERY------------------------>

// Handling the different views:
function show_view(name)
{
    $('.view').hide(); // Show the startup view.
    $('#view__' + name).show(); // Show the startup view.
}

// <-----------------ON APPLICATION LOADED--------------------->
var usuario = readCookie('usuario');
var pass = readCookie('pass');
var status = readCookie('status');
var fbType = 0;
var fbText = "";
$(document).ready(function () 
{	
	if(usuario != null && pass != null) signin(usuario, pass);
	else show_view('givefeedback_selection'); // Show the startup view.
	
	// Initiate feedback..	
	get_feedback_list( fbType );
});

// Feedback, selecting a feedback text-string:
function select_feedback(e)
{
	fbType = fbType + 1;
	fbText = fbText + $(e).html()+' ';
	$('div#feedback_text').html(fbText + '..');
	if(fbType<4)
	{
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
// saving feedback:
function save_feedback()
{
	if(set_feedback_to_image(imageFeedback,fbText))
	{
		show_view('givefeedback_done');
	}
}

// <-----------------------OTHERS------------------------>
function readCookie(name) 
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) 
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}



















