module PhaserCordovaGame {

    export abstract class Piece extends Phaser.Sprite {

        type: TypePiece;
        canBeAlone: boolean;
        isClickable: boolean;
        constructor(game: Phaser.Game, texture : string) {
            super(game, 0, 0, texture);
            game.add.existing(this);
            this.canBeAlone = false;
            this.isClickable = true;
        }

        public canCombine(other: Piece) {
            if (other == null || other == undefined) {
                return false;
            }
            return this.type == other.type;
        } 
        
        public delete() {
            console.log("Deleté");
            this.kill();
        }       
    }

    export const NombreTypePiece =7;
    export enum TypePiece {
        Vert = 0,
        Rouge = 1,
        Bleu = 2,
        Jaune = 3,
        Bombe = 4,
        Line = 5,
        Obstacle = 6
    }
}
