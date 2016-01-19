module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        apiHelper: GoogleGameDev.ApiHelper

        constructor() {
            super();
            SimpleGame.apiHelper.getListAchievements(this.logAchievements);
        }

        
        init(levelToStart?: number) {
            if (levelToStart) {
                this.startLevel(levelToStart);
            }
            else {
                // display choose level
                this.startLevel(1);
            }
        }

        startLevel(targetLevel: number) {
            this.plateauJoueur = new Plateau(this.game,5, 5);
            var t = new LevelLoader();
            t.readLevel(targetLevel, (d: LevelData) => { console.log("Fichier level lu"); this.plateauJoueur.loadPlateauFromLevelData(d, targetLevel); });
        }

        update() {
        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

        logAchievements(data?: GoogleGameDev.AchievementDefinitionsListResponse) {
            alert(data.items.length + " achievements");
            console.log(data);
        }
    }
}