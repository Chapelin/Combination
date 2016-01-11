module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        constructor() {
            super();

        }

        create() {
            this.plateauJoueur = new Plateau(this.game, 10,7);
          }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

    }
}