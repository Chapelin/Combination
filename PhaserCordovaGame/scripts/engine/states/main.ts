module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        apiHelper: GoogleGameDev.ApiHelper

        constructor() {
            super();
        }

        create() {
            this.plateauJoueur = new Plateau(this.game, 10, 7);
            var t = new LevelLoader();
            var levelToLoad: number = 1;
            t.readLevel(levelToLoad, (d: LevelData) => { console.log("Fichier level lu"); this.plateauJoueur.loadPlateauFromLevelData(d, levelToLoad); });
        }

        update() {
        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

        logAchievements(data?: GoogleGameDev.AchievementDefinitionsListResponse) {
            console.log(data);
        }
    }
}