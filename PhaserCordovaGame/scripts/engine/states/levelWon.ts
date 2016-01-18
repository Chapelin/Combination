module PhaserCordovaGame {
    export class LevelWon extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        textGain: Phaser.Text;
        textScore: Phaser.Text;
        buttonNextLevel: Phaser.Button;
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
                fontSize : 35
               
            }
        }


        init(currentLevel: number, score: number) {
            this.levelNumber = currentLevel;
            this.nombreCoup = score;

            this.textGain = new Phaser.Text(this.game, 50, 50, "Bravo !", this.defaultStyle);
            this.textScore = new Phaser.Text(this.game, 50, 150, "Vous avez fini  le niveau " + this.levelNumber + " en  " + this.nombreCoup + " coups.", this.defaultStyle);
            this.buttonMain = new Phaser.Button(this.game, 50, 300, AssetKeys.assetBoutonRouge, this.startMain, this)
            this.buttonMain.width = 150;
            this.buttonNextLevel = new Phaser.Button(this.game, 50, 450, AssetKeys.assetBoutonVert, this.startNextLevel, this)
            this.buttonNextLevel.width = 150;
            this.game.add.existing(this.textGain);
            this.game.add.existing(this.textScore);
            this.game.add.existing(this.buttonNextLevel);
            this.game.add.existing(this.buttonMain);
        }

        startNextLevel() {
            this.game.state.start(stateMain,true,false, this.levelNumber++);
        }

        startMain() {
            this.game.state.start(stateMain);
        }
        

    }
}