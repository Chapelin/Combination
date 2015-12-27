module PhaserCordovaGame {
    export class Plateau extends Phaser.Group {
        pieces: Array<Array<Piece>>;
        taillePlateauX: number;
        taillePlateauY: number;
        scale: Phaser.Point;
        pas: number;

        constructor(game: Phaser.Game, sizeX: number, sizeY : number) {
            super(game, null, "plateau", true);
            this.taillePlateauX = sizeX;
            this.taillePlateauY = sizeY;
            // X est plus petit que Y
            this.pas = (SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            this.processScale();
            this.initTableau();
            this.refreshPosition();
        }

        private processScale() {
            var p = PieceFactory.CreatePiece(this.game, TypePiece.Vert);
            var originalHeight = p.texture.height
            this.scale = new Phaser.Point(this.pas / originalHeight, this.pas / originalHeight);
            p.kill();
        }

        private initTableau() {
            this.pieces = [];
            for (var x = 0; x < this.taillePlateauX; x++) {
                this.pieces[x] = [];
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y] = PieceFactory.CreatePieceRandom(this.game);
                }
            }
        }


        public refreshPosition() {
            var debutX = SimpleGame.realWidth * 0.1 + this.pas / 2 ;
            var debutY = (SimpleGame.realHeight - (this.taillePlateauY * this.pas)) / 2;
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y].position = new Phaser.Point(debutX + this.pas * x, debutY + this.pas * y);
                    this.pieces[x][y].scale = this.scale;
                }
            }
        }


       
    }
}