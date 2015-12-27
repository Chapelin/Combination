var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var AssetKeys = (function () {
        function AssetKeys() {
        }
        AssetKeys.assetLogo = "logo";
        AssetKeys.assetBilleVert = "billeVert";
        AssetKeys.assetBillerouge = "billeRouge";
        AssetKeys.assetBoutonVert = "boutonVert";
        AssetKeys.assetBoutonRouge = "boutonRouge";
        return AssetKeys;
    })();
    PhaserCordovaGame.AssetKeys = AssetKeys;
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
            SimpleGame.realHeight = window.innerHeight * window.devicePixelRatio;
            SimpleGame.realWidth = window.innerWidth * window.devicePixelRatio;
            this.game = new Phaser.Game(SimpleGame.realWidth, SimpleGame.realHeight, Phaser.AUTO, 'content');
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
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, PhaserCordovaGame.AssetKeys.assetLogo);
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
            //var button = this.game.add.button(200, 600, AssetKeys.assetBoutonVert, null, this);
            //button.inputEnabled = true;
            //button.onInputUp.add(this.ajout1, this);
            //var button3 = this.game.add.button(200, 700, AssetKeys.assetBoutonRouge, null, this);
            //button3.inputEnabled = true;
            //button3.onInputUp.add(this.ajout2, this);
            //var button2 = this.game.add.button(400, 600, AssetKeys.assetBoutonVert, null, this);
            //button2.inputEnabled = true;
            //button2.onInputUp.add(this.testCombinaison, this);
            this.plateauJoueur = new PhaserCordovaGame.Plateau(this.game, 7, 5);
        };
        Main.prototype.update = function () {
        };
        Main.prototype.gameOver = function () {
            this.game.state.start(PhaserCordovaGame.stateGameOver);
        };
        Main.prototype.ajout = function (t) {
            console.log("Appuyé");
        };
        Main.prototype.ajout1 = function () {
            this.ajout(PhaserCordovaGame.TypePiece.Vert);
        };
        Main.prototype.ajout2 = function () {
            this.ajout(PhaserCordovaGame.TypePiece.Rouge);
        };
        Main.prototype.testCombinaison = function () {
            //this.plateauJoueur.findCombinaison();
        };
        return Main;
    })(Phaser.State);
    PhaserCordovaGame.Main = Main;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Plateau = (function (_super) {
        __extends(Plateau, _super);
        function Plateau(game, sizeX, sizeY) {
            _super.call(this, game, null, "plateau", true);
            this.taillePlateauX = sizeX;
            this.taillePlateauY = sizeY;
            // X est plus petit que Y
            this.pas = (PhaserCordovaGame.SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            this.processScale();
            this.initTableau();
            this.refreshPosition();
        }
        Plateau.prototype.processScale = function () {
            var p = PhaserCordovaGame.PieceFactory.CreatePiece(this.game, PhaserCordovaGame.TypePiece.Vert);
            var originalHeight = p.texture.height;
            this.scale = new Phaser.Point(this.pas / originalHeight, this.pas / originalHeight);
            p.kill();
        };
        Plateau.prototype.initTableau = function () {
            this.pieces = [];
            for (var x = 0; x < this.taillePlateauX; x++) {
                this.pieces[x] = [];
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y] = PhaserCordovaGame.PieceFactory.CreatePieceRandom(this.game);
                }
            }
        };
        Plateau.prototype.refreshPosition = function () {
            var debutX = PhaserCordovaGame.SimpleGame.realWidth * 0.1 + this.pas / 2;
            var debutY = (PhaserCordovaGame.SimpleGame.realHeight - (this.taillePlateauY * this.pas)) / 2;
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x][y].position = new Phaser.Point(debutX + this.pas * x, debutY + this.pas * y);
                    this.pieces[x][y].scale = this.scale;
                }
            }
        };
        return Plateau;
    })(Phaser.Group);
    PhaserCordovaGame.Plateau = Plateau;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.call(this);
        }
        Preload.prototype.preload = function () {
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetLogo, "images/phaser2.png");
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBilleVert, "images/bille.png");
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBillerouge, "images/billeRouge.png");
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBoutonVert, "images/boutonVert.png");
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBoutonRouge, "images/boutonRouge.png");
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
            this.scale = new Phaser.Point(0.4, 0.4);
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
            result.anchor = new Phaser.Point(0.5, 0.5);
            return result;
        };
        PieceFactory.CreatePieceRandom = function (game) {
            var typePiece;
            switch (Math.floor(Math.random() * 2)) {
                case 0:
                    typePiece = PhaserCordovaGame.TypePiece.Vert;
                    break;
                case 1:
                    typePiece = PhaserCordovaGame.TypePiece.Rouge;
                    break;
            }
            return PieceFactory.CreatePiece(game, typePiece);
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
//# sourceMappingURL=appBundle.js.map