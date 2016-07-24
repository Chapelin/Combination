module PhaserCordovaGame {

    export abstract class PieceDestruction extends Piece {

        public pattern: PatternDestruction;

        constructor(game: Phaser.Game, assetKey: string) {
            super(game, assetKey);
            this.canDeleteMore = true;
        }


        public canCombine(other: Piece) {
            return false;
        }

   

        public processMore(x: number, y: number, xMax: number, yMax: number) {
            return DestructionZoneCalculator.getZoneDestruction(this.pattern, xMax, yMax, x, y);
        }
    }
}