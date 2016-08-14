module PhaserCordovaGame {
    export class PieceVerticalLine extends PieceDestruction {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetVerticalLine);
            this.type = TypePiece.Line;
            this.canBeAlone = true;
            this.pattern = PatternDestruction.VerticalLine;
        } 

      
    }
}