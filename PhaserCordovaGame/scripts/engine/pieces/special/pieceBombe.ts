module PhaserCordovaGame {
    export class PieceBombe extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBilleBomb);
            this.type = TypePiece.Bombe;
            this.canBeAlone = true;
        }

        public canCombine(other: Piece) {
            return false;
        }

    }
}