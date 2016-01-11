module PhaserCordovaGame {

    export class Preload extends Phaser.State {
        game: Phaser.Game;

        
        constructor() {
            super();
        }

        preload() {
            this.game.load.image(AssetKeys.assetLogo, "images/phaser2.png");
            this.game.load.image(AssetKeys.assetBilleVert, "images/bille.png");
            this.game.load.image(AssetKeys.assetBillerouge, "images/billeRouge.png");
            this.game.load.image(AssetKeys.assetBillebleu, "images/billeBleu.png");
            this.game.load.image(AssetKeys.assetBilleJaune, "images/billeJaune.png");
            this.game.load.image(AssetKeys.assetBoutonVert, "images/boutonVert.png");
            this.game.load.image(AssetKeys.assetBoutonRouge, "images/boutonRouge.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}