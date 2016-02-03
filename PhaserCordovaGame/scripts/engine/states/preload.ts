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
            this.game.load.image(AssetKeys.assetLevelBoxDone, "images/ui/level-box_done.png");
            this.game.load.image(AssetKeys.assetLevelBoxUnAvailable, "images/ui/level-box_inavailable.png");
            this.game.load.image(AssetKeys.assetPanel, "images/ui/panel-650x400.png");
            this.game.load.image(AssetKeys.assetLevelCompleteTitle, "images/ui/lvlcomplete.png");

            this.game.load.image(AssetKeys.assetButtonChoose, "images/ui/buttonChooseLevel.png");
            this.game.load.image(AssetKeys.assetButtonNextLevel, "images/ui/buttonNextLevel.png");
            this.game.load.image(AssetKeys.assetButtonRestart, "images/ui/buttonRestart.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}