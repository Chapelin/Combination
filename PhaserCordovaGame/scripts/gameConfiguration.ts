module PhaserCordovaGame {
    export class GameConfiguration {
        public static GAMEANIM_SPEED_FALL = 500;
        public static GAMEANIM_SPEED_FADE = 200;

        public static getDefaultFont(): Phaser.PhaserTextStyle {
            var fontName = "Arial";
            if (window.cordova.platformId === "android") {
                fontName = "Droid Sans";
            }

             return {
                font: fontName,
                fill: "#ff0044",
                fontSize: 35
            }
        }
    }
}