module PhaserCordovaGame {
    export class PieceSimple extends Piece {
        constructor(game: Phaser.Game, type: TypePiece, asset : string) {
            super(game, asset);
            this.type = type;
        } 

        public onActivate() {
        }

       
    }
}