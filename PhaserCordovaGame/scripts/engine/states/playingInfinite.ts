/// <reference path="parent/baseplaying.ts" />
module PhaserCordovaGame {

    export class PlayingInfinite extends BasePlaying {
        constructor() {
            super();
        }


        init() {
            super.init();
            this.plateauJoueur = new Plateau(this.game, null, this.majScore.bind(this), PlayMode.Infinite);
            this.plateauJoueur.loadPlateauForInfinite(8, 8);
            this.setupUI();
        }

        setupUI() {
       
            var config: PanelConfiguration;
            config = {
                screenHeight: SimpleGame.realHeight,
                screenWidth: SimpleGame.realWidth,
                titleKey: AssetKeys.assetPauseTitle,
                cancellable: true,
                text: "Que voulez vous faire ?",
                buttons: [
                    {
                        action: this.restartLevel,
                        contextAction: this,
                        key: AssetKeys.assetButtonRestart,
                        keyClick: AssetKeys.assetButtonRestart_click,
                        position: ButtonPosition.Left
                    },
                    {
                        action: this.chooseLevel,
                        contextAction: this,
                        key: AssetKeys.assetButtonChoose,
                        keyClick: AssetKeys.assetButtonChoose_click,
                        position: ButtonPosition.Right
                    }
                ]
            }
            this.panel = new Panel(this.game, config);
            this.game.add.existing(this.panel);
        }

        restartLevel() {
            this.game.state.start(statePlayingInfinite, true, false, null);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false)
        }

     

        majScore(score: number) {
        }
    }
}