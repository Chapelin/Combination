module PhaserCordovaGame {
    export class PieceLine extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetLine);
            this.type = TypePiece.Line;
        } 

       
    }
}