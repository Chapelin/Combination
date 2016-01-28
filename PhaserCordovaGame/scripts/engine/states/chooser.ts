module PhaserCordovaGame {
    export class Chooser extends Phaser.State {
        game: Phaser.Game;
        numberOfColX: number = 4;
        numberOfColY: number = 8;
        levelLoader: LevelLoader

        constructor() {
            super();
            this.levelLoader = new LevelLoader();
            this.levelLoader.storeLevelData();
        }


        init(levelToStart?: number) {

            if (!levelToStart) {
                // affichage
                this.setupLevelChooser();
            }
            else {
                this.startLevel(levelToStart);
            }

        }

        startLevel(targetLevel: number) {
            this.game.state.start(statePlaying, true, false, this.levelLoader.readLevel(targetLevel));
        }

        setupLevelChooser() {
            var fontName = "Arial";
            if (window.cordova.platformId === "android") {
                fontName = "Droid Sans";
            }
            var defaultStyle = {
                font: fontName,
                fill: "#ff0044",
                fontSize: 35
            }

            var tailleX = SimpleGame.realWidth / ((this.numberOfColX * 1.5) + 0.5);
            var tailleY = SimpleGame.realHeight / ((this.numberOfColY  * 1.5) + 0.5);
            var taille = Math.min(tailleX, tailleY);
            var X = taille * 0.5;
            var Y = taille * 0.5;
            
            for (var i = 1; i <= this.levelLoader.getNumberOfLevels(); i++) {
                
                var compteurY = i / this.numberOfColX;
                var button = this.game.add.button(X, Y, AssetKeys.assetLevelBox);
                button.width = taille;
                button.height = taille;
                var text = this.game.add.text(0, 0, "" + i, defaultStyle);
                text.anchor.set(0.5);
                text.x = Math.floor(button.x + button.width / 2);
                text.y = Math.floor(button.y + button.height / 2);

                if (i % this.numberOfColX === 0) {
                    X = taille * 0.5;
                    Y += taille * 1.5;
                } else {
                    X += taille * 1.5;
                }
            }
        }

        update() {
        }
    }
}