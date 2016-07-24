module PhaserCordovaGame {

    export abstract class Piece extends Phaser.Sprite {

        type: TypePiece;
        canBeAlone: boolean;
        isClickable: boolean;
        canDeleteMore: boolean;

        constructor(game: Phaser.Game, texture : string) {
            super(game, 0, 0, texture);
            game.add.existing(this);
            this.canBeAlone = false;
            this.isClickable = true;
            this.canDeleteMore = false;
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


        public processMore(x: number, y: number, xMax: number, yMax: number): number[][]{
            return [];
        }
    }



    export const NombreTypePiece =8;
    export enum TypePiece {
        Vert = 0,
        Rouge = 1,
        Bleu = 2,
        Jaune = 3,
        Bombe = 4,
        Line = 5,
        Obstacle = 6,
        VerticalLine = 7
    }
}
