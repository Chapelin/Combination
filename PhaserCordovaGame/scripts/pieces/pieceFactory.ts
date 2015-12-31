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
                case TypePiece.Bleu:
                    result = new PieceBleu(game);
                    break;
                default:
                    throw new TypeError("Type de piece non géré");
            }
            result.anchor = new Phaser.Point(0.5, 0.5);
            return result;
        }

        public static CreatePieceRandom(game: Phaser.Game): Piece {
            var typePiece;
            switch (Math.floor(Math.random() * NombreTypePiece)) {
                case 0:
                    typePiece = TypePiece.Vert;
                    break;
                case 1:
                    typePiece = TypePiece.Rouge;
                    break;
                case 2:
                    typePiece = TypePiece.Bleu;
                    break;
            }
            return PieceFactory.CreatePiece(game, typePiece);
        }
    }
}
