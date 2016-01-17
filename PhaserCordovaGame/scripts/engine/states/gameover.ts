module PhaserCordovaGame {
    export class GameOver extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }

        init( currentLevel: number) {

        }

        create() {

        }

        restartGame() {
            this.game.state.start(stateGameTitle);
        }
    }
}