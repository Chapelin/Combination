module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        apiHelper: GoogleGameDev.ApiHelper

        constructor() {
            super();
            this.apiHelper = new GoogleGameDev.ApiHelper();

        }

        create() {
          
            this.plateauJoueur = new Plateau(this.game, 10, 7);
            this.apiHelper.getListAchievements(this.logAchievements, this);
            var t = new LevelLoader();
            t.readLevel(1, (d) => console.log);


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