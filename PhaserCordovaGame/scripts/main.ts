module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
        token: GoogleApiOAuth2TokenObject;
        baseUrl: string = "https://www.googleapis.com/games/v1/"
        constructor() {
            super();

        }

        create() {
            gapi.auth.authorize({
                client_id: '634302798162-n2vj530cdd378m4gjs8ukgtkb7jbelak.apps.googleusercontent.com',
                scope:'https://www.googleapis.com/auth/games'
            }, this.callBackAuth.bind(this)
            );
            this.plateauJoueur = new Plateau(this.game, 10, 7);

        }

        update() {

        }

        gameOver() {
            this.game.state.start(stateGameOver);
        }

        callBackAuth(token: GoogleApiOAuth2TokenObject) {
            this.token = token
            console.log(token);
            gapi.auth.setToken(token)
            gapi.client.request({
                path: this.baseUrl + "achievements",
                method: "GET",
                callback: this.test
            }
            );
        }

        test(data?: GoogleGameDev.AchievementDefinitionsListResponse) {
            console.log(data);
        }
    }

}