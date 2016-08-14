module PhaserCordovaGame {
    export class PieceObstacle extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetObstacle);
            this.type = TypePiece.Obstacle;
            this.isClickable = false;
        }

        public canCombine(other: Piece) {
            return false;
        }

        public onActivate() { }
    }
}