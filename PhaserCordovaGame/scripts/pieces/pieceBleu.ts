module PhaserCordovaGame {
    export class PieceBleu extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBillebleu);
            this.type = TypePiece.Vert;
        } 
    }
}