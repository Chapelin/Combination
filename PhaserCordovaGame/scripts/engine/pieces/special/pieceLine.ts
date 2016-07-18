﻿module PhaserCordovaGame {
    export class PieceLine extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetLine);
            this.type = TypePiece.Line;
            this.canBeAlone = true;
        } 

        public canCombine(other: Piece) {
            return false;
        }

       
    }
}