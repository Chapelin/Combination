module PhaserCordovaGame {

    export class PieceFactory {

        public static CreatePiece(game: Phaser.Game, typeP: TypePiece, scalePiece? : Phaser.Point ): Piece {
            var result: Piece;
            switch (typeP) {
                case TypePiece.Vert:
                    result = new PieceSimple(game, TypePiece.Vert, AssetKeys.assetBilleVert);
                    break;
                case TypePiece.Rouge:
                    result = new PieceSimple(game, TypePiece.Rouge, AssetKeys.assetBillerouge);
                    break;
                case TypePiece.Bleu:
                    result = new PieceSimple(game, TypePiece.Bleu, AssetKeys.assetBillebleu);
                    break;
                case TypePiece.Jaune:
                    result = new PieceSimple(game, TypePiece.Jaune, AssetKeys.assetBilleJaune);
                    break;
                case TypePiece.Bombe:
                    result = new PieceBombe(game);
                    break;
                case TypePiece.Line:
                    result = new PieceLine(game);
                    break;
                case TypePiece.VerticalLine:
                    result = new PieceVerticalLine(game);
                    break;
                case TypePiece.Obstacle:
                    result = new PieceObstacle(game);
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

        public static CreatePieceRandom(game: Phaser.Game, scalePiece?: Phaser.Point): Piece {
            return PieceFactory.CreatePiece(game, Math.floor(Math.random() * NombreTypePiece), scalePiece);
        }

        public static CreatePieceRandomWeighted(game: Phaser.Game, scalePiece?: Phaser.Point): Piece {
            var weight = [
                TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu,
                TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu,
                TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu,
                TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu, TypePiece.Bleu,
                TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune,
                TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune,
                TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune,
                TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune, TypePiece.Jaune,
                TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge,
                TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge,
                TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge,
                TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge, TypePiece.Rouge,
                TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert,
                TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert,
                TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert,
                TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert, TypePiece.Vert,
                TypePiece.Obstacle, TypePiece.Obstacle, TypePiece.Obstacle, TypePiece.Obstacle, TypePiece.Bombe, TypePiece.Bombe,TypePiece.Line, TypePiece.VerticalLine];
            return PieceFactory.CreatePiece(game, weight[Math.floor(Math.random() * weight.length)], scalePiece);
        }
    }
}
