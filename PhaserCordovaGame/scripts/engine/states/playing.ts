module PhaserCordovaGame {

    export class Playing extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        buttonRestart: Phaser.Button;
        currentData: LevelFileData;
        constructor() {
            super();
        }


        init(levelData: LevelFileData) {
            this.currentData = levelData;
            this.buttonRestart = new Phaser.Button(this.game, 10, 0, AssetKeys.assetBoutonRouge, this.restart, this);
            this.game.add.existing(this.buttonRestart);

            this.plateauJoueur = new Plateau(this.game, 5, 5);
            this.plateauJoueur.loadPlateauFromLevelData(levelData);
        }

        restart() {
            this.game.state.start(statePlaying, true, false, this.currentData);
        }
    }
}