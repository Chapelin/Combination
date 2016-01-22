/// <reference path="../bower_components/phaser/typescript/phaser.d.ts" />

module PhaserCordovaGame {

    export var stateBoot = "Boot";
    export var statePreload = "Preload";
    export var stateGameTitle = "GameTitle";
    export var stateLevelWon = "LevelWon";
    export var stateMain = "Main";
    export var stateGameOver = "GameOver";

    export class SimpleGame {
        public static realWidth: number;
        public static realHeight: number;
        constructor() {
            SimpleGame.realHeight = window.innerHeight * window.devicePixelRatio;
            SimpleGame.realWidth = window.innerWidth * window.devicePixelRatio;
            this.game = new Phaser.Game(SimpleGame.realWidth, SimpleGame.realHeight, Phaser.AUTO, 'content');

            //Add all states
            this.game.state.add(stateBoot, Boot);
            this.game.state.add(statePreload, Preload);
            this.game.state.add(stateGameTitle, GameTitle);
            this.game.state.add(stateMain, Main);
            this.game.state.add(stateGameOver, GameOver);
            this.game.state.add(stateLevelWon, LevelWon);

            //Start the first state
            this.game.state.start(stateBoot);
        }

        game: Phaser.Game;

    }
}