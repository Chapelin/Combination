/// <reference path="definitions/phaser.d.ts" />

module PhaserCordovaGame {

    export var stateBoot = "Boot";
    export var statePreload = "Preload";
    export var stateGameTitle = "GameTitle";
    export var stateLevelWon = "LevelWon";
    export var stateChooser = "LevelChooser";
    export var stateGameOver = "GameOver";
    export var statePlayingPuzzle = "PlayingPuzzle";
    export var statePlayingInfinite = "PlayingInfinite";
    export var stateChooseMode = "ChooseMode";

    export class SimpleGame {
        public static realWidth: number;
        public static realHeight: number;
        public static dataService: GameDataService;
    
        constructor() {
            SimpleGame.realHeight = window.innerHeight * window.devicePixelRatio;
            SimpleGame.realWidth = window.innerWidth * window.devicePixelRatio;
            this.game = new Phaser.Game(SimpleGame.realWidth, SimpleGame.realHeight, Phaser.AUTO, 'content');
            SimpleGame.dataService = new GameDataService();

            //Add all states
            this.game.state.add(stateBoot, Boot);
            this.game.state.add(statePreload, Preload);
            this.game.state.add(stateGameTitle, GameTitle);
            this.game.state.add(stateChooseMode, ChooseMode);
            this.game.state.add(stateChooser, LevelChooser);
            this.game.state.add(stateGameOver, GameOver);
            this.game.state.add(stateLevelWon, LevelWon);
            this.game.state.add(statePlayingPuzzle, PlayingPuzzle);
            this.game.state.add(statePlayingInfinite, PlayingInfinite);
            //Start the first state
            this.game.state.start(stateBoot);
        }

        game: Phaser.Game;


        public saveGameData() {
            SimpleGame.dataService.saveData();
        }

    }
}