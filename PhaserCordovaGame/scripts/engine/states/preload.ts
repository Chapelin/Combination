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
            this.game.load.image(AssetKeys.assetVerticalLine, "images/pieces/vertLine.png");
            this.game.load.image(AssetKeys.assetObstacle, "images/pieces/stone.png");
            this.game.load.image(AssetKeys.assetLevelBox, "images/ui/level-box.png");
            this.game.load.image(AssetKeys.assetLevelBoxDone, "images/ui/level-box_done.png");
            this.game.load.image(AssetKeys.assetLevelBoxUnAvailable, "images/ui/level-box_inavailable.png");
            this.game.load.image(AssetKeys.assetPanel, "images/ui/blue_panel.png");
            this.game.load.image(AssetKeys.assetLevelCompleteTitle, "images/ui/titlelvlcomplete.png");
            this.game.load.image(AssetKeys.assetLevelFailedTitle, "images/ui/titlelvlfailed.png");
            this.game.load.image(AssetKeys.assetPauseTitle, "images/ui/titlepause.png");
            this.game.load.image(AssetKeys.assBackPanelModal, "images/ui/backPanelModal.png");
            this.game.load.image(AssetKeys.assetCancelIcon, "images/ui/cancelIcon.png");

            this.game.load.image(AssetKeys.assetButtonChoose, "images/ui/buttonChooseLevel.png");
            this.game.load.image(AssetKeys.assetButtonChoose_click, "images/ui/buttonChooseLevel_click.png");
            this.game.load.image(AssetKeys.assetButtonNextLevel, "images/ui/buttonNextLevel.png");
            this.game.load.image(AssetKeys.assetButtonNextLevel_click, "images/ui/buttonNextLevel_click.png");
            this.game.load.image(AssetKeys.assetButtonRestart, "images/ui/buttonRestart.png");
            this.game.load.image(AssetKeys.assetButtonRestart_click, "images/ui/buttonRestart_click.png");
            this.game.load.image(AssetKeys.assetButtonStap, "images/ui/buttonStap.png");
            this.game.load.image(AssetKeys.assetButtonStap_click, "images/ui/buttonStap_click.png");
            this.game.load.image(AssetKeys.assetButtonPrec, "images/ui/backButton.png");
            this.game.load.image(AssetKeys.assetButtonNext, "images/ui/nextButton.png");
        }

        create() {
            this.game.state.start(stateGameTitle);
        }
    }
}