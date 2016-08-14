module PhaserCordovaGame {

    export abstract class BasePlaying extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonStop: Phaser.Button;
        panel: Panel;
        constructor() {
            super();
        }

        init(levelData?: LevelFileData) {
            this.buttonStop = new Phaser.Button(this.game, 10, 0, AssetKeys.assetButtonStap);
            this.buttonStop.inputEnabled = true;
            this.buttonStop.events.onInputUp.add(this.stap, this);
            this.game.add.existing(this.buttonStop);
            this.setupUI();
        }


        abstract prepareConfiguration(baseConfig: PanelConfiguration): PanelConfiguration;


        setupUI() {
            var config: PanelConfiguration;
            config = {
                screenHeight: SimpleGame.realHeight,
                screenWidth: SimpleGame.realWidth,
                titleKey: AssetKeys.assetPauseTitle,
                cancellable: true,
                buttons: []
            }
            var fullConfig = this.prepareConfiguration(config);
            this.panel = new Panel(this.game, fullConfig);
            this.game.add.existing(this.panel);
        }

        stap() {
            this.panel.show();
        }

    }
}