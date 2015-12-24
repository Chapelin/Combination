module PhaserCordovaGame {
    export class Plateau extends Phaser.Group {
        pieces: Array<Piece>;
        taillePlateau: number;
        tailleCercle: number = 200;
        centre: Phaser.Point = new Phaser.Point(200, 200);

        constructor(game: Phaser.Game, size: number) {
            super(game, null,"plateau",true);
            this.taillePlateau = size;
            this.pieces = [];
            var min = (Math.min(SimpleGame.realHeight, SimpleGame.realWidth));
            this.tailleCercle = min / 3;
            this.centre = new Phaser.Point(SimpleGame.realWidth / 2, SimpleGame.realHeight / 2);
            console.log("centre : ");
            console.log(this.centre);
            console.log("cercle : " + this.tailleCercle);
        }

        public insertPiece(position: number, pieceAInserer: Piece) {
            Assert.AssertBetween(position, 0, this.taillePlateau);
            this.pieces = ArrayUtil.insert(this.pieces, pieceAInserer, position);
            this.refreshPositions();
        }

        public deletePieces(...indexes: number[]) {

            var newPieces: Array<Piece> = [];
            for (var i = 0; i < this.pieces.length; i++) {
                if (indexes.indexOf(i) == -1) {
                    newPieces.push(this.pieces[i]);
                }

            }
            this.pieces = newPieces;
            this.refreshPositions;
        }

        public getIndexOf(p: Piece): number {
            return (this.pieces.indexOf(p));
        }

        public refreshPositions() {
            var taille = this.pieces.length;
            var angle = 0;
            var pas = (2 * Math.PI) / taille;
            this.pieces.forEach((p, i) => {
                var x = Math.round(this.centre.x + this.tailleCercle * Math.cos(angle));
                var y = Math.round(this.centre.y + this.tailleCercle * Math.sin(angle));
                p.x = x;
                p.y = y;
                angle += pas;
            });
        }


        // TODO : gerer la "boucle" entre la derniere et la premiere : 
        // si derniere == premiere, on boucle jusqu'a ce qu'on ait une difference
        public findCombinaison() {
            var threehold = 4;
            var tableauSimple: TypePiece[] = this.pieces.map((p, i, a) => p.type);
            var combinations = [];
            var current = [];
            var last = null;
            for (var i = 0; i < tableauSimple.length; i++) {
                if (last != tableauSimple[i]) {
                    if (current.length >= threehold){
                        combinations.push(current);
                    }
                    current = [];
                    last = tableauSimple[i];
                }
                current.push(i);
            }
            if (current.length >= threehold) {
                combinations.push(current);
            }
            console.log(combinations);
        }
    }
}