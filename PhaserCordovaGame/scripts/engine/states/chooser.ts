module PhaserCordovaGame {
    export class Chooser extends Phaser.State {
        game: Phaser.Game;
       
        levelLoader: LevelLoader

        constructor() {
            super();
            this.levelLoader = new LevelLoader();
            this.levelLoader.storeLevelData();
        }


        init(levelToStart: number = 3) {
          
            this.startLevel(levelToStart);

        }

        startLevel(targetLevel: number) {
            this.game.state.start(statePlaying, true, false, this.levelLoader.readLevel(targetLevel));
        }

        update() {
        }
    }
}