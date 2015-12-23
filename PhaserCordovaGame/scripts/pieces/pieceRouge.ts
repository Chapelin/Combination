module PhaserCordovaGame {
    export class PieceRouge extends Piece {
        constructor(game: Phaser.Game) {
            super(game, "billeRouge");
            this.type = TypePiece.Rouge;
        }
    }
}