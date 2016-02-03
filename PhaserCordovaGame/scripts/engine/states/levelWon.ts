module PhaserCordovaGame {
    export class LevelWon extends Phaser.State {
        game: Phaser.Game;
        nombreCoup: number;
        levelNumber: number;
        //textGain: Phaser.Text;
        //textScore: Phaser.Text;
        //buttonNextLevel: Phaser.Button;
        //buttonMain: Phaser.Button;
        defaultStyle: Phaser.PhaserTextStyle;
        panel: Panel;

        constructor() {
            super();
        }


        init(currentLevel: number, score: number) {
            this.levelNumber = currentLevel;
            this.nombreCoup = score;
            this.panel = new Panel(this.game);
            this.panel.setBackImage(SimpleGame.realWidth, SimpleGame.realHeight);
            this.panel.addTitle();
            this.panel.addText("Bravo ! \r\nVous avez fini le niveau " + this.levelNumber + " en " + this.nombreCoup + " coups");
            this.panel.addButton(AssetKeys.assetButtonChoose, this.startMain, this, ButtonPosition.Left);
            this.panel.addButton(AssetKeys.assetButtonNextLevel, this.startNextLevel, this, ButtonPosition.Right);
            //this.textGain = new Phaser.Text(this.game, 50, 50, "Bravo !", this.defaultStyle);
            //this.textScore = new Phaser.Text(this.game, 50, 150, "Vous avez fini  le niveau " + this.levelNumber + " en  " + this.nombreCoup + " coups.", this.defaultStyle);
            //this.buttonMain = new Phaser.Button(this.game, 50, 300, AssetKeys.assetBoutonRouge, this.startMain, this)
            //this.buttonMain.width = 150;
            //this.buttonNextLevel = new Phaser.Button(this.game, 50, 450, AssetKeys.assetBoutonVert, this.startNextLevel, this)
            //this.buttonNextLevel.width = 150;
            var isNewLevelFinished  = SimpleGame.dataService.addLevelFinished(currentLevel);
            var isHighScore = SimpleGame.dataService.addScore(currentLevel, score);

            this.game.add.existing(this.panel);
            //this.game.add.existing(this.textGain);
            //this.game.add.existing(this.textScore);
            //this.game.add.existing(this.buttonNextLevel);
            //this.game.add.existing(this.buttonMain);
        }

        startNextLevel() {
            this.game.state.start(stateChooser,true,false, this.levelNumber++);
        }

        startMain() {
            this.game.state.start(stateChooser);
        }
        

    }
}