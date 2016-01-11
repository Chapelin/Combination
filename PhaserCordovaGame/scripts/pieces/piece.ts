module PhaserCordovaGame {

    export abstract class Piece extends Phaser.Sprite {

        type: TypePiece;

        constructor(game: Phaser.Game, texture : string) {
            super(game, 0, 0, texture);
            game.add.existing(this);
        }

        public canCombine(other: Piece) {
            if (other == null || other == undefined) {
                throw new ReferenceError("Impossible de comparer à null");
            }
            return this.type == other.type;
        } 
        
        public delete() {
            console.log("Deleté");
            this.kill();
        }       
    }

    export const NombreTypePiece = 4;
    export enum TypePiece {
        Vert,
        Rouge,
        Bleu,
        Jaune
    }
}
