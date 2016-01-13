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

        ajout(t: TypePiece) {
           
            console.log("Appuyé");
        }

        ajout1() {
            this.ajout(TypePiece.Vert);

        }

        ajout2() {
            this.ajout(TypePiece.Rouge);

        }

        testCombinaison() {
            //this.plateauJoueur.findCombinaison();
        }
    }
}