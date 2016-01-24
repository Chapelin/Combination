module PhaserCordovaGame {
    export class PieceObstacle extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetObstacle);
            this.type = TypePiece.Obstacle;
        }

    }
}