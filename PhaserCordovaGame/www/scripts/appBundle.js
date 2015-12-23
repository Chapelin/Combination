var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Assert = (function () {
        function Assert() {
        }
        /// Pete si valeur < min ou > MAX
        Assert.AssertBetween = function (valeur, min, max) {
            if (valeur < min || valeur > max) {
                throw new RangeError("La valeur " + valeur + " n'est pas dans la fourchette " + min + " - " + max);
            }
        };
        return Assert;
    })();
    PhaserCordovaGame.Assert = Assert;
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.insert = function (arrayToUpdate, element, position) {
            Assert.AssertBetween(position, 0, arrayToUpdate.length);
            var firstPart = arrayToUpdate.slice(0, position);
            var secondePart = arrayToUpdate.slice(position, arrayToUpdate.length);
            var result = firstPart;
            result.push(element);
            secondePart.forEach(function (e, i, arr) { return result.push(e); });
            return result;
        };
        return ArrayUtil;
    })();
    PhaserCordovaGame.ArrayUtil = ArrayUtil;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start(PhaserCordovaGame.statePreload);
        };
        return Boot;
    })(Phaser.State);
    PhaserCordovaGame.Boot = Boot;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
/// <reference path="../bower_components/phaser/typescript/phaser.d.ts" />
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    //enum States { Boot, Preload, GameTitle, Main, GameOver };
    //function getStateName(state: States) : string {
    //    var stateName: string = States[state];
    //    return stateName;
    //}
    PhaserCordovaGame.stateBoot = "Boot";
    PhaserCordovaGame.statePreload = "Preload";
    PhaserCordovaGame.stateGameTitle = "GameTitle";
    PhaserCordovaGame.stateMain = "Main";
    PhaserCordovaGame.stateGameOver = "GameOver";
    var SimpleGame = (function () {
        function SimpleGame() {
            this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content');
            //Add all states
            this.game.state.add(PhaserCordovaGame.stateBoot, PhaserCordovaGame.Boot);
            this.game.state.add(PhaserCordovaGame.statePreload, PhaserCordovaGame.Preload);
            this.game.state.add(PhaserCordovaGame.stateGameTitle, PhaserCordovaGame.GameTitle);
            this.game.state.add(PhaserCordovaGame.stateMain, PhaserCordovaGame.Main);
            this.game.state.add(PhaserCordovaGame.stateGameOver, PhaserCordovaGame.GameOver);
            //Start the first state
            this.game.state.start(PhaserCordovaGame.stateBoot);
        }
        return SimpleGame;
    })();
    PhaserCordovaGame.SimpleGame = SimpleGame;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.call(this);
        }
        GameOver.prototype.create = function () {
        };
        GameOver.prototype.restartGame = function () {
            this.game.state.start(PhaserCordovaGame.stateGameTitle);
        };
        return GameOver;
    })(Phaser.State);
    PhaserCordovaGame.GameOver = GameOver;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var GameTitle = (function (_super) {
        __extends(GameTitle, _super);
        function GameTitle() {
            _super.call(this);
        }
        GameTitle.prototype.create = function () {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, PhaserCordovaGame.assetLogo);
            logo.anchor.setTo(0.5, 0.5);
            logo.scale.setTo(0.2, 0.2);
            logo.inputEnabled = true;
            logo.events.onInputDown.add(this.startGame, this);
            this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        };
        GameTitle.prototype.startGame = function () {
            this.game.state.start(PhaserCordovaGame.stateMain);
        };
        return GameTitle;
    })(Phaser.State);
    PhaserCordovaGame.GameTitle = GameTitle;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
/// <reference path="game.ts" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var game = new PhaserCordovaGame.SimpleGame();
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = PhaserCordovaGame.Application || (PhaserCordovaGame.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this);
        }
        Main.prototype.create = function () {
            var button = this.game.add.button(200, 600, "boutonVert", null, this);
            button.inputEnabled = true;
            button.onInputUp.add(this.ajout1, this);
            this.plateauJoueur = new PhaserCordovaGame.Plateau(this.game, 10);
            this.plateauJoueur.insertPiece(0, PhaserCordovaGame.PieceFactory.CreatePiece(this.game, PhaserCordovaGame.TypePiece.Vert));
            this.plateauJoueur.insertPiece(1, PhaserCordovaGame.PieceFactory.CreatePiece(this.game, PhaserCordovaGame.TypePiece.Rouge));
            this.plateauJoueur.insertPiece(1, PhaserCordovaGame.PieceFactory.CreatePiece(this.game, PhaserCordovaGame.TypePiece.Vert));
        };
        Main.prototype.update = function () {
        };
        Main.prototype.gameOver = function () {
            this.game.state.start(PhaserCordovaGame.stateGameOver);
        };
        Main.prototype.ajout1 = function () {
            this.plateauJoueur.insertPiece(2, PhaserCordovaGame.PieceFactory.CreatePiece(this.game, PhaserCordovaGame.TypePiece.Rouge));
            console.log("Appuyé");
        };
        return Main;
    })(Phaser.State);
    PhaserCordovaGame.Main = Main;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Plateau = (function (_super) {
        __extends(Plateau, _super);
        function Plateau(game, size) {
            _super.call(this, game, null, "plateau", true);
            this.tailleCercle = 100;
            this.centre = new Phaser.Point(200, 200);
            this.taillePlateau = size;
            this.pieces = [];
        }
        Plateau.prototype.insertPiece = function (position, pieceAInserer) {
            PhaserCordovaGame.Assert.AssertBetween(position, 0, this.taillePlateau);
            this.pieces = PhaserCordovaGame.ArrayUtil.insert(this.pieces, pieceAInserer, position);
            this.refreshPositions();
        };
        Plateau.prototype.refreshPositions = function () {
            var _this = this;
            var taille = this.pieces.length;
            var angle = 0;
            var pas = (2 * Math.PI) / taille;
            this.pieces.forEach(function (p, i) {
                var x = Math.round(_this.centre.x + _this.tailleCercle * Math.cos(angle) - _this.centre.x / 2);
                var y = Math.round(_this.centre.y + _this.tailleCercle * Math.sin(angle) - _this.centre.y / 2);
                p.x = x;
                p.y = y;
                angle += pas;
            });
        };
        return Plateau;
    })(Phaser.Group);
    PhaserCordovaGame.Plateau = Plateau;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    PhaserCordovaGame.assetLogo = "logo";
    PhaserCordovaGame.assetBilleVert = "billeVert";
    PhaserCordovaGame.assetBillerouge = "billeRouge";
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.call(this);
        }
        Preload.prototype.preload = function () {
            this.game.load.image(PhaserCordovaGame.assetLogo, "images/phaser2.png");
            this.game.load.image(PhaserCordovaGame.assetBilleVert, "images/bille.png");
            this.game.load.image(PhaserCordovaGame.assetBillerouge, "images/billeRouge.png");
            this.game.load.image("boutonVert", "images/boutonVert.png");
        };
        Preload.prototype.create = function () {
            this.game.state.start(PhaserCordovaGame.stateGameTitle);
        };
        return Preload;
    })(Phaser.State);
    PhaserCordovaGame.Preload = Preload;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Piece = (function (_super) {
        __extends(Piece, _super);
        function Piece(game, texture) {
            _super.call(this, game, 0, 0, texture);
            this.scale = new Phaser.Point(0.5, 0.5);
            game.add.existing(this);
        }
        return Piece;
    })(Phaser.Sprite);
    PhaserCordovaGame.Piece = Piece;
    (function (TypePiece) {
        TypePiece[TypePiece["Vert"] = 0] = "Vert";
        TypePiece[TypePiece["Rouge"] = 1] = "Rouge";
    })(PhaserCordovaGame.TypePiece || (PhaserCordovaGame.TypePiece = {}));
    var TypePiece = PhaserCordovaGame.TypePiece;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceFactory = (function () {
        function PieceFactory() {
        }
        PieceFactory.CreatePiece = function (game, typeP) {
            var result;
            switch (typeP) {
                case PhaserCordovaGame.TypePiece.Vert:
                    result = new PhaserCordovaGame.PieceVerte(game);
                    break;
                case PhaserCordovaGame.TypePiece.Rouge:
                    result = new PhaserCordovaGame.PieceRouge(game);
                    break;
                default:
                    throw new TypeError("Type de piece non géré");
            }
            return result;
        };
        return PieceFactory;
    })();
    PhaserCordovaGame.PieceFactory = PieceFactory;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceRouge = (function (_super) {
        __extends(PieceRouge, _super);
        function PieceRouge(game) {
            _super.call(this, game, "billeRouge");
            this.type = PhaserCordovaGame.TypePiece.Rouge;
        }
        return PieceRouge;
    })(PhaserCordovaGame.Piece);
    PhaserCordovaGame.PieceRouge = PieceRouge;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceVerte = (function (_super) {
        __extends(PieceVerte, _super);
        function PieceVerte(game) {
            _super.call(this, game, "billeVert");
            this.type = PhaserCordovaGame.TypePiece.Vert;
        }
        return PieceVerte;
    })(PhaserCordovaGame.Piece);
    PhaserCordovaGame.PieceVerte = PieceVerte;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
//# sourceMappingURL=appBundle.js.map