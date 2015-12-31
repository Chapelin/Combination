module PhaserCordovaGame {
    export class PieceRouge extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBillerouge);
            this.type = TypePiece.Rouge;
        }
    }
}