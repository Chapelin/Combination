module PhaserCordovaGame {

    export var assetLogo: string = "logo";
    export var assetBille: string = "bille";

    export class Preload extends Phaser.State {
        game: Phaser.Game;

        
        constructor() {
            super();
        }

        preload() {
            this.game.load.image(assetLogo, "images/phaser2.png");
            this.game.load.image(assetBille, "images/bille.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}