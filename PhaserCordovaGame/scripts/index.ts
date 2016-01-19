/// <reference path="game.ts" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
module PhaserCordovaGame {
    "use strict";

    export module Application {
        export function initialize() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        var authWindows: InAppBrowser;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            
            document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", onResume, false);
            var url = "https://accounts.google.com/o/oauth2/auth?client_id=" + Keys.GoogleClientId + "&scope=https://www.googleapis.com/auth/games&response_type=token&redirect_uri=http://localhost";
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
           
           authWindows = window.open(url, '_blank', 'location=no,toolbar=no');

            authWindows.addEventListener('loadstart', started);
            
        }

        function started(data: InAppBrowserEvent) {

            var url = data.url;
            
            if (url.indexOf("#access_token") > -1) {
                var reg = new RegExp("access_token=(.+?)&.*&expires_in=(\\d*)");
                var res = reg.exec(url);
                var token = res[1];
                var expires = res[2];
                var dataToken: GoogleApiOAuth2TokenObject;
                dataToken = {
                    access_token: token,
                    error: null,
                    expires_in: expires,
                    state: null
                };
                var apiHelper = new GoogleGameDev.ApiHelper();
                apiHelper.initToken(dataToken);
                authWindows.close();
                var game = new SimpleGame(apiHelper);
            }
        }

   

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }

    window.onload = function () {
        Application.initialize();
    }
}
