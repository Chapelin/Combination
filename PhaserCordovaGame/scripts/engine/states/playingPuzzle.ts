/// <reference path="parent/baseplaying.ts" />
module PhaserCordovaGame {

    export class PlayingPuzzle extends BasePlaying {
        currentData: LevelFileData;
        public libelleCoups: Phaser.Text;

        constructor() {
            super();
        }


        init(levelData: LevelFileData) {
            super.init();
            this.currentData = levelData;
            this.libelleCoups = new Phaser.Text(this.game, 300, 10, "", GameConfiguration.getDefaultFont());
            this.libelleCoups.inputEnabled = false;
            this.game.add.existing(this.libelleCoups);
            this.plateauJoueur = new Plateau(this.game, this.majLibelleCoup.bind(this), null, PlayMode.Puzzle);
            this.plateauJoueur.loadPlateauFromLevelData(levelData);
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
            this.game.state.start(statePlayingPuzzle, true, false, this.currentData);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false)
        }

        majLibelleCoup(score: number) {
            this.libelleCoups.setText("" + score,true);
        }
    }
}