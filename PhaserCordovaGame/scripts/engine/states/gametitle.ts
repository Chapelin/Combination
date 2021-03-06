module PhaserCordovaGame {
    export class GameTitle extends Phaser.State {
        game: Phaser.Game;
        constructor() {
            super();
        }

        create() {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, AssetKeys.assetLogo);
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);
            logo.inputEnabled = true;
            logo.events.onInputDown.add(this.startGame, this);
            this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        }

        startGame() {
            this.game.state.start(stateChooseMode);
        }
    }
}
