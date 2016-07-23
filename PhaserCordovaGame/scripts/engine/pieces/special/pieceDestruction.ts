module PhaserCordovaGame {

    export abstract class PieceDestruction extends Piece {

        public pattern: PatternDestruction;

        constructor(game: Phaser.Game, assetKey: string) {
            super(game, assetKey);
        }


        public canCombine(other: Piece) {
            return false;
        }

        public onActivate() {
        }

    }
}