module PhaserCordovaGame {

    export var assetLogo: string = "logo";
    export var assetBilleVert: string = "billeVert";
    export var assetBillerouge: string = "billeRouge";

    export class Preload extends Phaser.State {
        game: Phaser.Game;

        
        constructor() {
            super();
        }

        preload() {
            this.game.load.image(assetLogo, "images/phaser2.png");
            this.game.load.image(assetBilleVert, "images/bille.png");
            this.game.load.image(assetBillerouge, "images/billeRouge.png");
            this.game.load.image("boutonVert", "images/boutonVert.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}