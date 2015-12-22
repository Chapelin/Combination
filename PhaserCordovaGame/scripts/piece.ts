module PhaserCordovaGame {

    export class Piece extends Phaser.Sprite {


        constructor(game: Phaser.Game, texture : string) {
            super(game, 0, 0, texture);
            game.add.existing(this);
        }        
    }
}
