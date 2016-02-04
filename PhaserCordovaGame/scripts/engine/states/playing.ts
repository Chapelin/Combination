module PhaserCordovaGame {

    export class Playing extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonStop: Phaser.Button;
        currentData: LevelFileData;
        panel: Panel;
        constructor() {
            super();
        }


        init(levelData: LevelFileData) {
            this.currentData = levelData;
            this.buttonStop = new Phaser.Button(this.game, 10, 0, AssetKeys.assetButtonStap, this.stap, this);
            this.game.add.existing(this.buttonStop);

            this.plateauJoueur = new Plateau(this.game, 5, 5);
            this.plateauJoueur.loadPlateauFromLevelData(levelData);
            this.panel = new Panel(this.game, SimpleGame.realWidth, SimpleGame.realHeight);
            this.panel.addText("Que voulez vous faire ?");
            this.panel.addButton(AssetKeys.assetButtonRestart, this.restartLevel, this, ButtonPosition.Left);
            this.panel.addButton(AssetKeys.assetButtonChoose, this.chooseLevel, this, ButtonPosition.Right);
            this.panel.finishSetup();
        }

        stap() {
            this.game.add.existing(this.panel);
            this.panel.show();
        }

        restartLevel() {
            this.game.state.start(statePlaying, true, false, this.currentData);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false, this.currentData.level)
        }
    }
}