/// <reference path="piecedestruction.ts" />

module PhaserCordovaGame {
    export class PieceBombe extends PieceDestruction {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBilleBomb);
            this.type = TypePiece.Bombe;
            this.pattern = PatternDestruction.Bombe
            this.canBeAlone = true;
        }


    }
}