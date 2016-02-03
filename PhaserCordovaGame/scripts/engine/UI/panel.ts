module PhaserCordovaGame {
    export class Panel extends Phaser.Group {
        imagePanel: Phaser.Image;
        defaultFontStyle: Phaser.PhaserTextStyle;

        constructor(game: Phaser.Game) {
            super(game, null, "Panel", false, false);

            var fontName = "Arial";
            if (window.cordova.platformId === "android") {
                fontName = "Droid Sans";
            }

            this.defaultFontStyle = {
                font: fontName,
                fill: "#ff0044",
                fontSize: 35
            }
        }

        public setBackImage(screenTx: number, screenTy: number) {
            this.imagePanel = new Phaser.Image(this.game, screenTx / 2, screenTy / 2, AssetKeys.assetPanel);
            this.imagePanel.anchor.set(0.5);
            this.add(this.imagePanel);
        }
       
        public addTitle() {
            var y = this.imagePanel.y - ((this.imagePanel.height - 10) / 2)
            var title = new Phaser.Image(this.game, this.imagePanel.x, y, AssetKeys.assetLevelCompleteTitle);
            title.anchor.set(0.5);
            this.add(title);
        }

        public addText(texte: string) {
            var textToAdd = new Phaser.Text(this.game, this.imagePanel.x, this.imagePanel.y, texte, this.defaultFontStyle);
            textToAdd.anchor.set(0.5);
            this.add(textToAdd)
        }

        public addButton(key: string, action: () => any, context: any, position: ButtonPosition) {
            var button = new Phaser.Button(this.game, 0, 0, key, action, context);
            var y = this.imagePanel.y + ((this.imagePanel.height - (button.height+60)) / 2);
            button.position.y = y;
            button.anchor.set(0.5);
            switch (position) {
                case ButtonPosition.Left:
                    var x = this.imagePanel.x - ((this.imagePanel.width - (button.width+60)) / 2);
                    button.position.x = x;
                    break;
                case ButtonPosition.Center:
                    button.position.x = this.imagePanel.x;
                    break;
                case ButtonPosition.Right:
                    var x = this.imagePanel.x + ((this.imagePanel.width - (button.width + 60)) / 2);
                    button.position.x = x;
                    break;
            }
            this.add(button);
        }

        public destroy() {
            this.imagePanel = null;
            super.destroy(true, false);
        }
    }

    export enum ButtonPosition {
        Left,
        Center,
        Right
    }
}