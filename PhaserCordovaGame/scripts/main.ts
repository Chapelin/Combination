﻿module PhaserCordovaGame {
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
            this.plateauJoueur.insertPiece(0, PieceFactory.CreatePiece(this.game, TypePiece.Vert));
            this.plateauJoueur.insertPiece(1, PieceFactory.CreatePiece(this.game, TypePiece.Rouge));
            this.plateauJoueur.insertPiece(1, PieceFactory.CreatePiece(this.game, TypePiece.Vert));
        }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

        ajout1() {
            this.plateauJoueur.insertPiece(2, PieceFactory.CreatePiece(this.game, TypePiece.Rouge));
            console.log("Appuyé");

        }
    }
}