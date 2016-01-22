module PhaserCordovaGame {
    export class PieceVerte extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBilleVert);
            this.type = TypePiece.Vert;
        } 
    }
}