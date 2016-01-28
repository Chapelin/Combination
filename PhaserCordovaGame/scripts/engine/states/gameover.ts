module PhaserCordovaGame {
    export class GameOver extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        textPerdu: Phaser.Text;
        buttonTry: Phaser.Button;
        buttonMain: Phaser.Button;
        defaultStyle: Phaser.PhaserTextStyle;

        constructor() {
            super();

            var fontName = "Arial";

            if (window.cordova.platformId === "android") {
                fontName = "Droid Sans";
            }
            this.defaultStyle = {
                font: fontName,
                fill: "#ff0044",
                fontSize: 35

            }
        }


        init(currentLevel: number) {
            this.levelNumber = currentLevel;

            this.textPerdu = new Phaser.Text(this.game, 50, 50, "Dommage.", this.defaultStyle);
            this.buttonMain = new Phaser.Button(this.game, 50, 300, AssetKeys.assetBoutonRouge, this.startMain, this)
            this.buttonMain.width = 150;
            this.buttonTry = new Phaser.Button(this.game, 50, 450, AssetKeys.assetBoutonVert, this.restart, this)
            this.buttonTry.width = 150;
            this.game.add.existing(this.textPerdu);
            this.game.add.existing(this.buttonTry);
            this.game.add.existing(this.buttonMain);
        }

        restart() {
            this.game.state.start(stateChooser, true, false, this.levelNumber);
        }

        startMain() {
            this.game.state.start(stateChooser);
        }


    }
}