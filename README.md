JQUERY READ COOKIE
==================

## Usage

Create session cookie:

    $.cookie('the_cookie', 'the_value');

Create expiring cookie, 7 days from then:

    $.cookie('the_cookie', 'the_value', { expires: 7 });

Create expiring cookie, valid across entire site:

    $.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });

Read cookie:

    $.cookie('the_cookie'); // => "the_value"
    $.cookie('not_existing'); // => null

Read all available cookies:

    $.cookie(); // => { "the_cookie": "the_value", "...remaining": "cookies" }

Delete cookie:

    // Returns true when cookie was found, false when no cookie was found...
    $.removeCookie('the_cookie');

    // Same path as when the cookie was written...
    $.removeCookie('the_cookie', { path: '/' });

*Note: when deleting a cookie, you must pass the exact same path, domain and secure options that were used to set the cookie, unless you're relying on the default options that is.*

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



