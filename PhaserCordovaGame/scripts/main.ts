module PhaserCordovaGame {
    export class Main extends Phaser.State {
        game: Phaser.Game;
        plateauJoueur: Plateau;
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
            console.log(token);
        }

    }

}