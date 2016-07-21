module PhaserCordovaGame {
    export class ChooseMode extends Phaser.State {
        game: Phaser.Game;
        defaultStyle: any;
        playInfinite: Phaser.Sprite
        playPuzzle: Phaser.Sprite
        constructor() {
            super();
        }


        create() {
            this.playInfinite = new Phaser.Sprite(this.game, 10, 10, AssetKeys.assetLevelBox);
            this.playPuzzle = new Phaser.Sprite(this.game, 10, 300, AssetKeys.assetLevelBoxUnAvailable);

            this.playInfinite.events.onInputUp.addOnce(this.clickModeInfinite, this);
            this.playPuzzle.events.onInputUp.addOnce(this.clickModePuzzle, this);
            this.playInfinite.inputEnabled = true;
            this.playPuzzle.inputEnabled = true;

            this.game.add.existing(this.playInfinite);
            this.game.add.existing(this.playPuzzle);
        }



        clickModePuzzle() {
            this.game.state.start(stateChooser);
        }

        clickModeInfinite() {
            this.game.state.start(statePlayingInfinite);
        }
    }
}