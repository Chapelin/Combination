module PhaserCordovaGame {
    export class Plateau {
        pieces: Array<Piece>;
        maxSize: number;

        constructor(size: number) {
            this.maxSize = size;
        }

        public insertPiece(position: number, pieceAInserer: Piece) {
            Assert.AssertBetween(position, 0, this.maxSize);
            this.pieces = ArrayUtil.insert(this.pieces, pieceAInserer, position);
        }
    }
}