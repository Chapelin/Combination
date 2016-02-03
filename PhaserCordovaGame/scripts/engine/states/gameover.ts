module PhaserCordovaGame {
    export class GameOver extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        panel: Panel;

        constructor() {
            super();
        }


        init(currentLevel: number) {
            this.levelNumber = currentLevel;
            this.panel = new Panel(this.game);
            this.panel.setBackImage(SimpleGame.realWidth, SimpleGame.realHeight);
            this.panel.addText("Dommage.");
            this.panel.addButton(AssetKeys.assetButtonChoose, this.startMain, this, ButtonPosition.Left);
            this.panel.addButton(AssetKeys.assetButtonRestart, this.restart, this, ButtonPosition.Right);
            this.game.add.existing(this.panel);
        }

        restart() {
            this.game.state.start(stateChooser, true, false, this.levelNumber);
        }

        startMain() {
            this.game.state.start(stateChooser);
        }


    }
}