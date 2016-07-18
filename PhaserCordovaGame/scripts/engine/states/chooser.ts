module PhaserCordovaGame {
    export class Chooser extends Phaser.State {
        game: Phaser.Game;
        numberOfColX: number = 4;
        numberOfColY: number = 7;
        levelLoader: LevelLoader
        interface: Phaser.Group;
        defaultStyle: any;
        constructor() {
            super();
            this.levelLoader = new LevelLoader();
            this.levelLoader.storeLevelData();
            var fontName = "Arial";
            if (window.cordova.platformId === "android") {
                fontName = "Droid Sans";
            }
            this.defaultStyle = {
                font: fontName,
                fill: "#ffffff",
                fontSize: 35
            }
        }


        init(levelToStart?: number) {
            this.interface = this.game.add.group(this.game, "interface", true, false);
            if (!levelToStart) {
                this.setupLevelChooser();
            }
            else {
                this.startLevel(levelToStart);
            }

        }

        startLevel(targetLevel: number) {
            var data = this.levelLoader.readLevel(targetLevel);
            if (data !== null) {
                this.game.state.start(statePlaying, true, false, data);
            }
        }

        setupLevelChooser(start: number = 1) {
            this.interface.removeAll(true, true);

            var tailleX = (SimpleGame.realWidth) / ((this.numberOfColX * 1.5) + 0.5);
            var tailleY = (SimpleGame.realHeight * 0.9) / ((this.numberOfColY * 1.5) + 0.5);
            var taille = Math.min(tailleX, tailleY);
            var X = taille * 0.5;
            var Y = taille * 0.5;
            var numberOfLevels = this.levelLoader.getNumberOfLevels()
            var end = this.numberOfColX * this.numberOfColY + start;
            end = Math.min(numberOfLevels + 1, end);
            var cpt = 0;
            for (var i = start; i < end; i++) {

                this.createButtonLevel(i, taille, X, Y);
                cpt++;
                if (cpt % this.numberOfColX === 0) {
                    X = taille * 0.5;
                    Y += taille * 1.5;
                } else {
                    X += taille * 1.5;
                }
            }

            if (start != 1) {
                var min = Math.max(start - this.numberOfColX * this.numberOfColY, 1);
                var prec = this.game.add.button(10, SimpleGame.realHeight * 0.9, AssetKeys.assetBoutonRouge, () => { this.setupLevelChooser(min); }, this);
                this.interface.add(prec);

            }
            if (end <= numberOfLevels) {

                var next = this.game.add.button(SimpleGame.realWidth - 10, SimpleGame.realHeight * 0.9, AssetKeys.assetBoutonRouge, () => { this.setupLevelChooser(end); }, this);
                next.anchor = new Phaser.Point(1, 0);
                this.interface.add(next);
            }
        }

        createButtonLevel(i: number, taille: number, X: number, Y: number) {
            var compteurY = i / this.numberOfColX;
            var boxKey = (SimpleGame.data.levelFinished && SimpleGame.data.levelFinished.indexOf(i) !== -1) ? AssetKeys.assetLevelBoxDone : AssetKeys.assetLevelBox;
            var button = this.game.add.button(X, Y, boxKey);

            button.width = taille;
            button.height = taille;
            var text = this.game.add.text(0, 0, "" + i, this.defaultStyle);
            text.anchor.set(0.5);
            text.x = Math.floor(button.x + button.width / 2);
            text.y = Math.floor(button.y + button.height / 2);


            button.inputEnabled = true;
            button.events.onInputUp.addOnce((d1, d2, d3, level) => this.startLevel(level), this, null, i);


            this.interface.add(button);
            this.interface.add(text);
        }


    }
}