module PhaserCordovaGame {
    export class LevelWon extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        panel: Panel;

        constructor() {
            super();
        }

        init(currentLevel: number, score: number) {
            this.levelNumber = currentLevel;
            this.nombreCoup = score;
            var config: PanelConfig;
            config = {
                screenHeight: SimpleGame.realHeight,
                screenWidth: SimpleGame.realWidth,
                showTitle: true,
                text: "Bravo ! \r\nVous avez fini le niveau " + this.levelNumber + " en " + this.nombreCoup + " coups",
                buttons: [
                    {
                        action: this.startMain,
                        contextAction: this,
                        key: AssetKeys.assetButtonChoose,
                        position: ButtonPosition.Left
                    },
                    {
                        action: this.startNextLevel,
                        contextAction: this,
                        key: AssetKeys.assetButtonNextLevel,
                        position: ButtonPosition.Right
                    }
                ]
            }

            this.panel = new Panel(this.game, config);
           
            var isNewLevelFinished  = SimpleGame.dataService.addLevelFinished(currentLevel);
            var isHighScore = SimpleGame.dataService.addScore(currentLevel, score);
            this.game.add.existing(this.panel);
            this.panel.show();
        }

        startNextLevel() {
            this.game.state.start(stateChooser,true,false, this.levelNumber++);
        }

        startMain() {
            this.game.state.start(stateChooser);
        }
    }
}