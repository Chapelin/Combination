module PhaserCordovaGame {

    export class PlayingInfinite extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonStop: Phaser.Button;
        panel: Panel;
        constructor() {
            super();
        }


        init(levelData: LevelFileData) {
            this.buttonStop = new Phaser.Button(this.game, 10, 0, AssetKeys.assetButtonStap);
            this.buttonStop.inputEnabled = true;
            this.buttonStop.events.onInputUp.add(this.stap, this);
            this.game.add.existing(this.buttonStop);
            this.plateauJoueur = new Plateau(this.game, 5, 5, this.majLibelleCoup.bind(this));
        }

        stap() {
            var config: PanelConfig;
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
            this.panel.show();
        }

        restartLevel() {
            this.game.state.start(statePlayingInfinite, true, false, null);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false)
        }

        majLibelleCoup(score: number) {
        }
    }
}