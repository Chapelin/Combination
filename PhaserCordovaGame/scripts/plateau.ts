module PhaserCordovaGame {
    export class Plateau extends Phaser.Group {
        pieces: Array<Array<Piece>>;
        taillePlateauX: number;
        taillePlateauY: number;
        

        constructor(game: Phaser.Game, sizeX: number, sizeY : number) {
            super(game, null, "plateau", true);
            this.taillePlateauX = sizeX;
            this.taillePlateauY = sizeY;
            
            this.initTableau();
            this.refreshPosition();
        }

        private initTableau() {
            this.pieces = [];
            for (var x = 0; x < this.taillePlateauX; x++) {
                this.pieces[x] = [];
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y] = PieceFactory.CreatePiece(this.game, TypePiece.Vert);
                }
            }
        }


        public refreshPosition() {
            // on part du principe que
            //   * 20% de rab de chaque coté
            // taille plateau  X >> taille Y
            var pas = (SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            var originalHeight = PieceFactory.CreatePiece(this.game, TypePiece.Vert).texture.height
            var scale = new Phaser.Point(pas / originalHeight, pas / originalHeight);
            var debutX = SimpleGame.realWidth * 0.1;
            var debutY = (SimpleGame.realHeight - (this.taillePlateauY * pas)) / 2;
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y].position = new Phaser.Point(debutX + pas * x, debutY + pas * y);
                    this.pieces[x][y].scale = scale;
                }
            }
        }


       
    }
}