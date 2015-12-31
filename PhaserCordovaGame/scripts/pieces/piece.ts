module PhaserCordovaGame {

    export class Piece extends Phaser.Sprite {

        type: TypePiece;

        constructor(game: Phaser.Game, texture : string) {
            super(game, 0, 0, texture);
            this.scale = new Phaser.Point(0.4, 0.4);
            game.add.existing(this);
        }

        public canCombine(other: Piece) {
            if (other == null || other == undefined) {
                throw new ReferenceError("Impossible de comparer à null");
            }
            return this.type == other.type;
        }        
    }

    export const NombreTypePiece = 3;
    export enum TypePiece {
        Vert,
        Rouge,
        Bleu
    }
}
