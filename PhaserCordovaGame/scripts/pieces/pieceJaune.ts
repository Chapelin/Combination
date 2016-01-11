module PhaserCordovaGame {
    export class PieceJaune extends Piece {
        constructor(game: Phaser.Game) {
            super(game, AssetKeys.assetBilleJaune);
            this.type = TypePiece.Jaune;
        }

        public canCombine(other: Piece) {
            if (other == null || other == undefined) {
                throw new ReferenceError("Impossible de comparer à null");
            }
            return this.type == other.type || other.type == TypePiece.Bleu;
        } 
    }
}