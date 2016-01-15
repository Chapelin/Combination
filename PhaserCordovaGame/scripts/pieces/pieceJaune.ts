module PhaserCordovaGame {
    export class PieceJaune extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBilleJaune);
            this.type = TypePiece.Jaune;
        }

    }
}