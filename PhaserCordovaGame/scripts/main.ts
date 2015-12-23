module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        constructor() {
            super();

        }


        create() {
            var button = this.game.add.button(200, 600, "boutonVert",null,this);
            button.inputEnabled = true;
            button.onInputUp.add(this.ajout1, this);
            this.plateauJoueur = new Plateau(this.game, 10);
            var p = new Piece(this.game, "billeVert");
            var p2 = new Piece(this.game, "billeRouge");
            var p3 = new Piece(this.game, "billeVert");
            this.plateauJoueur.insertPiece(0, p);
            this.plateauJoueur.insertPiece(1, p2);
            this.plateauJoueur.insertPiece(1, p3);
        }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

        ajout1() {

            var p = new Piece(this.game, "billeRouge");
            this.plateauJoueur.insertPiece(2, p);
            console.log("Appuyé");

        }
    }
}