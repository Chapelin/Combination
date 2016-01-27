module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        levelLoader: LevelLoader
        constructor() {
            super();
            this.levelLoader = new LevelLoader();
            this.levelLoader.storeLevelData();
        }


        init(levelToStart?: number) {
            if (levelToStart) {
                this.startLevel(levelToStart);
            }
            else {
                this.startLevel(3);
            }
        }

        startLevel(targetLevel: number) {
            this.plateauJoueur = new Plateau(this.game, 5, 5);
            this.plateauJoueur.loadPlateauFromLevelData(this.levelLoader.readLevel(targetLevel));
        }

        update() {
        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

    }
}