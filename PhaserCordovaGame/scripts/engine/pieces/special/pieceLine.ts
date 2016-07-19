module PhaserCordovaGame {
    export class PieceLine extends PieceDestruction {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetLine);
            this.type = TypePiece.Line;
            this.canBeAlone = true;
            this.pattern = PatternDestruction.Ligne;
        } 

      
    }
}