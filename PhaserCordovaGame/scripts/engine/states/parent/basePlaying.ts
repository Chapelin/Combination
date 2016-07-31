module PhaserCordovaGame {

    export abstract class BasePlaying extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonStop: Phaser.Button;
        panel: Panel;
        constructor() {
            super();
        }

        init(levelData?: LevelFileData) {
            this.buttonStop = new Phaser.Button(this.game, 10, 0, AssetKeys.assetButtonStap);
            this.buttonStop.inputEnabled = true;
            this.buttonStop.events.onInputUp.add(this.stap, this);
            this.game.add.existing(this.buttonStop);
        }


        stap() {
            this.panel.show();
        }

    }
}