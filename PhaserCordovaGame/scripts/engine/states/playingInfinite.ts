/// <reference path="parent/baseplaying.ts" />
module PhaserCordovaGame {

    export class PlayingInfinite extends BasePlaying {

        libelleScore: Phaser.Text;
        actualScore: number;
        constructor() {
            super();
        }


        init() {
            super.init();
            this.libelleScore = new Phaser.Text(this.game, 300, 10, "", GameConfiguration.getDefaultFont());
            this.libelleScore.inputEnabled = false;
            this.actualScore = 0;
            this.game.add.existing(this.libelleScore);
            this.plateauJoueur = new Plateau(this.game, null, this.majScore.bind(this), PlayMode.Infinite);
            this.plateauJoueur.loadPlateauForInfinite(8, 8);
            this.setupUI();

        }

        prepareConfiguration(baseConfig: PanelConfiguration) {
            baseConfig.text = "Que voulez vous faire ?";
            baseConfig.buttons = [
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
            return baseConfig;
        }

        restartLevel() {
            this.game.state.start(statePlayingInfinite, true, false, null);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false)
        }

        majScore(supprime: number) {
            var score = Math.ceil(Math.pow(supprime, 1.5));
            this.actualScore += score;
            this.libelleScore.setText("Score : " + this.actualScore, true);

        }
    }
}