module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        constructor() {
            super();

        }

        create() {
            //var button = this.game.add.button(200, 600, AssetKeys.assetBoutonVert, null, this);
            //button.inputEnabled = true;
            //button.onInputUp.add(this.ajout1, this);

            //var button3 = this.game.add.button(200, 700, AssetKeys.assetBoutonRouge, null, this);
            //button3.inputEnabled = true;
            //button3.onInputUp.add(this.ajout2, this);

            //var button2 = this.game.add.button(400, 600, AssetKeys.assetBoutonVert, null, this);
            //button2.inputEnabled = true;
            //button2.onInputUp.add(this.testCombinaison, this);

            this.plateauJoueur = new Plateau(this.game, 7,5);
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