module PhaserCordovaGame {

    export class Preload extends Phaser.State {
        game: Phaser.Game;

        
        constructor() {
            super();
        }

        preload() {
            this.game.load.image(AssetKeys.assetLogo, "images/phaser2.png");
            this.game.load.image(AssetKeys.assetBilleVert, "images/pieces/bille.png");
            this.game.load.image(AssetKeys.assetBillerouge, "images/pieces/billeRouge.png");
            this.game.load.image(AssetKeys.assetBillebleu, "images/pieces/billeBleu.png");
            this.game.load.image(AssetKeys.assetBilleJaune, "images/pieces/billeJaune.png");
            this.game.load.image(AssetKeys.assetBoutonVert, "images/pieces/boutonVert.png");
            this.game.load.image(AssetKeys.assetBoutonRouge, "images/pieces/boutonRouge.png");
            this.game.load.image(AssetKeys.assetBilleBomb, "images/pieces/bomb.png");
            this.game.load.image(AssetKeys.assetLine, "images/pieces/line.png");
            this.game.load.image(AssetKeys.assetObstacle, "images/pieces/stone.png");
            this.game.load.image(AssetKeys.assetLevelBox, "images/ui/level-box.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}