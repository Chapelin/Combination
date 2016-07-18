module PhaserCordovaGame {
    export class Panel extends Phaser.Group {

        defaultFontStyle: Phaser.PhaserTextStyle;
        maxScale: Phaser.Point;
        panelHeight: number = 400;
        panelWidth: number = 600;
        constructor(game: Phaser.Game, config: PanelConfig) {
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
            this.maxScale = new Phaser.Point(1, 1);
            this.setupBack(config);
            this.setupPanel(config);
            this.scale = new Phaser.Point(0.001, 0.001);
        }

        private setupBack(config: PanelConfig) {
            var back = new Phaser.Image(this.game, 0, 0, AssetKeys.assBackPanelModal);
            back.inputEnabled = true;
            back.width = config.screenWidth;
            back.height = config.screenHeight;
            this.add(back);
        }

        private setupPanel(config: PanelConfig) {
            var imagePanel = new Phaser.Image(this.game, config.screenWidth / 2, config.screenHeight / 2, AssetKeys.assetPanel);
            imagePanel.anchor.set(0.5);
            imagePanel.width = this.panelWidth;
            imagePanel.height = this.panelHeight;
            this.add(imagePanel);
            if (config.titleKey) {
                var y = imagePanel.y - ((imagePanel.height - 10) / 2)
                var title = new Phaser.Image(this.game, imagePanel.x, y, config.titleKey);
                title.anchor.set(0.5);
                this.add(title);
            }

            var textToAdd = new Phaser.Text(this.game, imagePanel.x, imagePanel.y, config.text, this.defaultFontStyle);
            textToAdd.anchor.set(0.5);
            this.add(textToAdd)
            if (config.cancellable) {
                var cancel = new Phaser.Button(this.game, imagePanel.right-20, imagePanel.top+20, AssetKeys.assetCancelIcon);
                cancel.anchor.set(0.5, 0.5);
                cancel.inputEnabled = true;
                cancel.events.onInputUp.addOnce(() => { this.destroy(true, false); }, this);
                this.add(cancel);
            }
            for (var i = 0; i < config.buttons.length; i++) {
                this.addButton(config.buttons[i], imagePanel);
            }

            var scalMin = Math.min(config.screenWidth / imagePanel.x, config.screenHeight / imagePanel.y);
            if (scalMin < 1) {
                this.maxScale = new Phaser.Point(scalMin, scalMin);
            }

        }

        public addButton(config: PanelButtonConfig, imagePanel: Phaser.Image) {
            var button = new Phaser.Button(this.game, 0, 0, config.key);
            button.inputEnabled = true;
            button.events.onInputUp.addOnce(config.action, config.contextAction);
            var y = imagePanel.bottom - (button.height /2 ) -50;
            button.position.y = y;
            button.anchor.set(0.5);
            switch (config.position) {
                case ButtonPosition.Left:
                    var x = imagePanel.left + (button.width / 2) + 50;
                    button.position.x = x;
                    break;
                case ButtonPosition.Center:
                    button.position.x = imagePanel.x;
                    break;
                case ButtonPosition.Right:
                    var x = imagePanel.right - (button.width / 2) - 50;
                    button.position.x = x;
                    break;
            }
            this.add(button);
        }

        public show() {
            var t = this.game.add.tween(this.scale);
            t.to(this.maxScale, GameConfiguration.GAMEANIM_SPEED_FADE, Phaser.Easing.Exponential.In, true);
        }

    }

    export enum ButtonPosition {
        Left,
        Center,
        Right
    }
}