module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }


        create() {
            var p = new Piece(this.game, "bille");
        }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }
    }
}