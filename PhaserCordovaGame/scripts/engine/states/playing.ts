module PhaserCordovaGame {

    export class Playing extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonStop: Phaser.Button;
        currentData: LevelFileData;
        panel: Panel;
        constructor() {
            super();
        }


        init(levelData: LevelFileData) {
            this.currentData = levelData;
            this.buttonStop = new Phaser.Button(this.game, 10, 0, AssetKeys.assetButtonStap);
            this.buttonStop.inputEnabled = true;
            this.buttonStop.events.onInputUp.add(this.stap, this);
            this.game.add.existing(this.buttonStop);
            this.plateauJoueur = new Plateau(this.game, 5, 5);
            this.plateauJoueur.loadPlateauFromLevelData(levelData);
            
        
        }

        stap() {
            var config: PanelConfig;
            config = {
                screenHeight: SimpleGame.realHeight,
                screenWidth: SimpleGame.realWidth,
                showTitle: false,
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
            this.game.state.start(statePlaying, true, false, this.currentData);
        }

        chooseLevel() {
            this.game.state.start(stateChooser, true, false)
        }
    }
}