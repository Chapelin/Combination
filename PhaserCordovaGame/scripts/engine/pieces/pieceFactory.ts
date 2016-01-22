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
                case TypePiece.Jaune:
                    result = new PieceJaune(game);
                    break;
                case TypePiece.Bombe:
                    result = new PieceBombe(game);
                    break;
                default:
                    throw new TypeError("Type de piece non géré");
            }
            result.anchor = new Phaser.Point(0.5, 0.5);
            return result;
        }

        public static CreatePieceRandom(game: Phaser.Game): Piece {
            return PieceFactory.CreatePiece(game, Math.floor(Math.random() * NombreTypePiece));
        }
    }
}
