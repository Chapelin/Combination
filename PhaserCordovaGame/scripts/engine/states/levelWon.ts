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
            this.panel = new Panel(this.game, SimpleGame.realWidth, SimpleGame.realHeight);
            this.panel.addTitle();
            this.panel.addText("Bravo ! \r\nVous avez fini le niveau " + this.levelNumber + " en " + this.nombreCoup + " coups");
            this.panel.addButton(AssetKeys.assetButtonChoose, this.startMain, this, ButtonPosition.Left);
            this.panel.addButton(AssetKeys.assetButtonNextLevel, this.startNextLevel, this, ButtonPosition.Right);
           
            var isNewLevelFinished  = SimpleGame.dataService.addLevelFinished(currentLevel);
            var isHighScore = SimpleGame.dataService.addScore(currentLevel, score);
            this.panel.finishSetup();
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