module PhaserCordovaGame {
    export class DestructionZoneCalculator {

        public static getZoneDestruction(pattern: PatternDestruction, tailleX: number, tailleY: number, posX: number, posY: number): number[][] {
            var result = null;
            switch (pattern) {
                case PatternDestruction.Bombe:
                    result = DestructionZoneCalculator.getZoneBombe(posX, posY, tailleX, tailleY);
                    break;
                case PatternDestruction.Ligne:
                    result = DestructionZoneCalculator.getZoneLine(posY, tailleX);
                    break;
                case PatternDestruction.VerticalLine:
                    result = DestructionZoneCalculator.getZoneVerticalLine(posX, tailleY);
                    break;
            }
            return result;
        }


        // ligne horizontale
        private static getZoneLine(y: number, tailleX : number): number[][] {
            var potentials = new Array<Array<number>>();
            for (var i = 0; i < tailleX; i++) {
                potentials.push([i, y]);
            }

            return potentials;
        }

        // ligne verticale
        private static getZoneVerticalLine(x: number, tailleY: number): number[][] {
            var potentials = new Array<Array<number>>();
            for (var i = 0; i < tailleY; i++) {
                potentials.push([x, i]);
            }

            return potentials;
        }

        // lbombe : 8 cases autour
        private  static getZoneBombe(x: number, y: number, tailleX: number, tailleY: number): number[][] {
            var potentials = new Array<Array<number>>();
            potentials.push([x, y]);
            if (x > 0) {
                potentials.push([x - 1, y]);
            }
            if (y > 0) {
                potentials.push([x, y - 1]);
            }
            if (y < tailleY - 1) {
                potentials.push([x, y + 1]);
            }
            if (x < tailleX - 1) {
                potentials.push([x + 1, y]);
            }

            if (x > 0 && y > 0) {
                potentials.push([x - 1, y - 1]);
            }
            if (x > 0 && y < tailleY - 1) {
                potentials.push([x - 1, y + 1]);
            }
            if (x < tailleX - 1 && y < tailleY - 1) {
                potentials.push([x + 1, y + 1]);
            }
            if (x < tailleX - 1 && y > 0) {
                potentials.push([x + 1, y - 1]);
            }

            return potentials;
        }
    }
}