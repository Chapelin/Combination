module PhaserCordovaGame {
    export class ChooseMode extends Phaser.State {
        game: Phaser.Game;
        defaultStyle: any;
        constructor() {
            super();

        }


        create() {
            this.game.state.start(stateChooser);
        }
    }
}