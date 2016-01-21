module PhaserCordovaGame {

    export class PieceFactory {

        public static CreatePiece(game: Phaser.Game, typeP: TypePiece, scalePiece? : Phaser.Point ): Piece {
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
                default:
                    throw new TypeError("Type de piece non géré");
            }
            result.anchor = new Phaser.Point(0.5, 0.5);
            if (scalePiece) {
                result.scale = new Phaser.Point(scalePiece.x, scalePiece.y);
            }
            return result;
        }

        public static CreatePieceRandom(game: Phaser.Game): Piece {
            return PieceFactory.CreatePiece(game, Math.floor(Math.random() * NombreTypePiece));
        }
    }
}
