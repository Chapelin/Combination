module PhaserCordovaGame {

    export class PieceFactory {

        public static CreatePiece(game: Phaser.Game, typeP: TypePiece): Piece {
            var result: Piece;
            switch (typeP) {
                case TypePiece.Vert:
                    result = new PieceVerte(game);
                    break;
                case TypePiece.Rouge:
                    result = new PieceRouge(game);
                    break;
                default:
                    throw new TypeError("Type de piece non géré");
            }
            return result;
        }

    }
}
