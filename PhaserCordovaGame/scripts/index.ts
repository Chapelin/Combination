/// <reference path="game.ts" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
module PhaserCordovaGame {
    "use strict";

    export module Application {
        //game: SimpleGame;
        export function initialize() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }

        var authWindows: InAppBrowser;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events

            document.addEventListener("pause", onPause.bind(this), false);
            document.addEventListener("resume", onResume.bind(this), false);
           
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            this.game = new SimpleGame();
            
        }

      

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
            this.game.saveGameData();
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }

    window.onload = function () {
        Application.initialize();
    }
}
