module PhaserCordovaGame {
    export class PieceVerte extends Piece {
        constructor(game: Phaser.Game) {
            super(game, "billeVert");
            this.type = TypePiece.Vert;
        } 
    }
}