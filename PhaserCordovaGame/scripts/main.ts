module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        constructor() {
            super();
           
        }


        create() {
            this.plateauJoueur = new Plateau(this.game, 10);
            var p = new Piece(this.game, "bille");
            var p2 = new Piece(this.game, "bille");
            var p3 = new Piece(this.game, "bille");
            this.plateauJoueur.insertPiece(0, p);
            this.plateauJoueur.insertPiece(1, p2);
            this.plateauJoueur.insertPiece(1, p3);
        }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }
    }
}