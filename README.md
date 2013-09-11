PHONEGAP NOTIFICATION:
======================

http://docs.phonegap.com/en/1.8.1/cordova_notification_notification.md.html

<!DOCTYPE html>
<html>
  <head>
    <title>Notification Example</title>

    <script type="text/javascript" charset="utf-8" src="cordova-1.8.1.js"></script>
    <script type="text/javascript" charset="utf-8">

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        // Empty
    }

    // alert dialog dismissed
    function alertDismissed() {
        // do something
    }

    // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }

    </script>
  </head>
  <body>
    <p><a href="#" onclick="showAlert(); return false;">Show Alert</a></p>
  </body>
</html>



