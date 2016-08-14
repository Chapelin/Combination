module PhaserCordovaGame {
    export class GameOver extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        panel: Panel;

        constructor() {
            super();
        }


        init(currentLevel: number) {
            this.levelNumber = currentLevel;
            var config: PanelConfiguration;
            config = {
                screenHeight: SimpleGame.realHeight,
                screenWidth: SimpleGame.realWidth,
                titleKey: AssetKeys.assetLevelFailedTitle,
                text: "Dommage",
                buttons: [
                    {
                        action: this.startMain,
                        contextAction: this,
                        key: AssetKeys.assetButtonChoose,
                        keyClick: AssetKeys.assetButtonChoose_click,
                        position: ButtonPosition.Left
                    },
                    {
                        action: this.restart,
                        contextAction: this,
                        key: AssetKeys.assetButtonRestart,
                        keyClick: AssetKeys.assetButtonRestart_click,
                        position: ButtonPosition.Right
                    }
                ]
            }
            this.panel = new Panel(this.game, config);

            this.game.add.existing(this.panel);
            this.panel.show();
        }

        restart() {
            this.game.state.start(stateChooser, true, false, this.levelNumber);
        }

        startMain() {
            this.game.state.start(stateChooser, true, false);
        }


    }
}