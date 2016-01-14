var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Keys = (function () {
        function Keys() {
        }
        Keys.GoogleClientId = "634302798162-n2vj530cdd378m4gjs8ukgtkb7jbelak.apps.googleusercontent.com";
        return Keys;
    })();
    PhaserCordovaGame.Keys = Keys;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var AssetKeys = (function () {
        function AssetKeys() {
        }
        AssetKeys.assetLogo = "logo";
        AssetKeys.assetBilleVert = "billeVert";
        AssetKeys.assetBillerouge = "billeRouge";
        AssetKeys.assetBillebleu = "billeBleu";
        AssetKeys.assetBilleJaune = "billeJaune";
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
    var GameConfiguration = (function () {
        function GameConfiguration() {
        }
        GameConfiguration.GAPIKey = '';
        GameConfiguration.GAMEANIM_SPEED = 1000;
        return GameConfiguration;
    })();
    PhaserCordovaGame.GameConfiguration = GameConfiguration;
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
            this.apiHelper = new GoogleGameDev.ApiHelper();
        }
        Main.prototype.create = function () {
            this.plateauJoueur = new PhaserCordovaGame.Plateau(this.game, 10, 7);
            this.apiHelper.getListAchievements(this.logAchievements, this);
        };
        Main.prototype.update = function () {
        };
        Main.prototype.gameOver = function () {
            this.game.state.start(PhaserCordovaGame.stateGameOver);
        };
        Main.prototype.logAchievements = function (data) {
            console.log(data);
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
            this.acceptInput = true;
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
            var _this = this;
            this.listTeensBloquants = new Array();
            var debutX = PhaserCordovaGame.SimpleGame.realWidth * 0.1 + this.pas / 2;
            var debutY = (PhaserCordovaGame.SimpleGame.realHeight - (this.taillePlateauY * this.pas)) / 2;
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    var p = this.pieces[x][y];
                    var tween = this.game.add.tween(p);
                    tween.to({
                        x: debutX + this.pas * x,
                        y: debutY + this.pas * y
                    }, PhaserCordovaGame.GameConfiguration.GAMEANIM_SPEED, Phaser.Easing.Quartic.In, false);
                    // si nouvellement créé
                    // on les place au dessus
                    if (p.x == 0 && p.y == 0) {
                        p.x = debutX + this.pas * x;
                        p.y = debutY - this.pas;
                    }
                    p.scale = this.scale;
                    this.listTeensBloquants.push(tween);
                    // Si actif, on clean
                    this.setupClickEventPiece(p, x, y);
                }
            }
            this.listTeensBloquants.forEach(function (v, i, arr) {
                v.onComplete.addOnce(function () {
                    // si tous les tweens sont finis
                    if (_this.tweensFinished()) {
                        _this.acceptInput = true;
                    }
                }, _this);
                v.start();
            });
        };
        Plateau.prototype.setupClickEventPiece = function (p, x, y) {
            var _this = this;
            if (p.inputEnabled) {
                p.inputEnabled = false;
                p.events.onInputUp.removeAll();
            }
            p.inputEnabled = true;
            p.events.onInputUp.addOnce(function (dummy, dummy2, dummy3, posX, posY) {
                if (_this.acceptInput) {
                    _this.acceptInput = false;
                    _this.combineZone(posX, posY);
                }
            }, this, 0, x, y);
        };
        Plateau.prototype.tweensFinished = function () {
            return this.listTeensBloquants.every(function (v) {
                return !v.isRunning;
            });
        };
        Plateau.prototype.getZoneCombine = function (x, y) {
            var valid = [[x, y]];
            // valid change de taille en live
            for (var compteurDeTest = 0; compteurDeTest < valid.length; compteurDeTest++) {
                var current = valid[compteurDeTest];
                var temp = this.findValidNeighbors(current[0], current[1]);
                // on traite les voisins possibles
                for (var j = 0; j < temp.length; j++) {
                    var currentNeigbhor = temp[j];
                    // si le voisin n'a pas encore été prévu pour verification
                    if (!PhaserCordovaGame.ArrayUtil.containsArray(valid, currentNeigbhor)) {
                        // on l'ajoute à la liste des valides à tester.
                        valid.push(currentNeigbhor);
                    }
                }
            }
            return valid;
        };
        Plateau.prototype.findValidNeighbors = function (x, y) {
            var listNeigbor = this.getNeigbhor(x, y);
            var p = this.pieces[x][y];
            return this.selectNeighborForCombine(p, listNeigbor);
        };
        Plateau.prototype.getNeigbhor = function (x, y) {
            var potentials = [];
            if (x > 0) {
                potentials.push([x - 1, y]);
            }
            if (y > 0) {
                potentials.push([x, y - 1]);
            }
            if (y < this.taillePlateauY - 1) {
                potentials.push([x, y + 1]);
            }
            if (x < this.taillePlateauX - 1) {
                potentials.push([x + 1, y]);
            }
            return potentials;
        };
        Plateau.prototype.selectNeighborForCombine = function (origine, potentiels) {
            var _this = this;
            var result = [];
            potentiels.forEach(function (pos, i, res) {
                if (origine.canCombine(_this.pieces[pos[0]][pos[1]])) {
                    result.push(pos);
                }
            }, this);
            return result;
        };
        Plateau.prototype.combineZone = function (x, y) {
            var _this = this;
            var list = this.getZoneCombine(x, y);
            console.log("Suppression de " + list.length + " elements");
            // à optimiser : refresh que les modifiés)
            list.forEach(function (pos, i, arr) {
                var p = _this.pieces[pos[0]][pos[1]];
                p.delete();
                _this.pieces[pos[0]][pos[1]] = null;
            });
            this.fallingDown();
            this.refreshPosition();
            console.log(this.printConsolePlateau());
        };
        Plateau.prototype.fallingDown = function () {
            // pour chaque X : on regarde les Y  depuis la fin
            // dès qu'on trouve un null, et qu'il n'y a pas que des null avant, on avance les precedents de 1
            // jusqu'a ce que ça soit bon
            // et on continue
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = this.taillePlateauY - 1; y > 0; y--) {
                    var reste = this.pieces[x].slice(0, y);
                    // tant que la piece est null ET qu'on a pas que des null
                    while (this.pieces[x][y] == null && !reste.every(function (x, n, a) { return x == null; })) {
                        PhaserCordovaGame.ArrayUtil.decalePiece(this.pieces[x], y);
                    }
                }
            }
        };
        Plateau.prototype.printConsolePlateau = function () {
            var res = "";
            for (var y = 0; y < this.taillePlateauY; y++) {
                for (var x = 0; x < this.taillePlateauX; x++) {
                    if (this.pieces[x][y] != null) {
                        res += this.pieces[x][y].type;
                    }
                    else {
                        res += "X";
                    }
                }
                res += "\n";
            }
            return res;
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
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBillebleu, "images/billeBleu.png");
            this.game.load.image(PhaserCordovaGame.AssetKeys.assetBilleJaune, "images/billeJaune.png");
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
var GoogleGameDev;
(function (GoogleGameDev) {
    var ApiHelper = (function () {
        function ApiHelper() {
            this.baseUrl = "https://www.googleapis.com/games/v1/";
            gapi.auth.authorize({
                client_id: PhaserCordovaGame.Keys.GoogleClientId,
                scope: 'https://www.googleapis.com/auth/games'
            }, this.callBackAuth.bind(this));
        }
        ApiHelper.prototype.callBackAuth = function (token) {
            this.token = token;
        };
        ApiHelper.prototype.getListAchievements = function (callback, context) {
            gapi.auth.setToken(this.token);
            gapi.client.request({
                path: this.baseUrl + "achievements",
                method: "GET",
                callback: callback.bind(context)
            });
        };
        return ApiHelper;
    })();
    GoogleGameDev.ApiHelper = ApiHelper;
})(GoogleGameDev || (GoogleGameDev = {}));
var GoogleGameDev;
(function (GoogleGameDev) {
    var AchievementDefinitionsListResponse = (function () {
        function AchievementDefinitionsListResponse() {
            this.kind = "games#achievementDefinitionsListResponse";
        }
        return AchievementDefinitionsListResponse;
    })();
    GoogleGameDev.AchievementDefinitionsListResponse = AchievementDefinitionsListResponse;
    var AchievementDefinitions = (function () {
        function AchievementDefinitions() {
            this.kind = "games#achievementDefinition";
        }
        return AchievementDefinitions;
    })();
    GoogleGameDev.AchievementDefinitions = AchievementDefinitions;
})(GoogleGameDev || (GoogleGameDev = {}));
var GoogleGameDev;
(function (GoogleGameDev) {
    var Application = (function () {
        function Application() {
            this.kind = "games#application";
        }
        return Application;
    })();
    GoogleGameDev.Application = Application;
    var ApplicationCategory = (function () {
        function ApplicationCategory() {
            this.kind = "games#applicationCategory";
        }
        return ApplicationCategory;
    })();
    GoogleGameDev.ApplicationCategory = ApplicationCategory;
    var ImageAsset = (function () {
        function ImageAsset() {
            this.kind = "games#imageAsset";
        }
        return ImageAsset;
    })();
    GoogleGameDev.ImageAsset = ImageAsset;
    var Instance = (function () {
        function Instance() {
            this.kind = "games#instance";
        }
        return Instance;
    })();
    GoogleGameDev.Instance = Instance;
    var InstanceAndroidDetails = (function () {
        function InstanceAndroidDetails() {
            this.kind = "games#instanceAndroidDetails";
        }
        return InstanceAndroidDetails;
    })();
    GoogleGameDev.InstanceAndroidDetails = InstanceAndroidDetails;
    var InstanceIosDetails = (function () {
        function InstanceIosDetails() {
            this.kind = "games#instanceIosDetails";
        }
        return InstanceIosDetails;
    })();
    GoogleGameDev.InstanceIosDetails = InstanceIosDetails;
    var InstanceWebDetails = (function () {
        function InstanceWebDetails() {
            this.kind = "games#instanceWebDetails";
        }
        return InstanceWebDetails;
    })();
    GoogleGameDev.InstanceWebDetails = InstanceWebDetails;
})(GoogleGameDev || (GoogleGameDev = {}));
var GoogleGameDev;
(function (GoogleGameDev) {
    var Player = (function () {
        function Player() {
            this.kind = "games#player";
        }
        return Player;
    })();
    GoogleGameDev.Player = Player;
    var Played = (function () {
        function Played() {
            this.kind = "games#played";
        }
        return Played;
    })();
    GoogleGameDev.Played = Played;
    var NameData = (function () {
        function NameData() {
        }
        return NameData;
    })();
    GoogleGameDev.NameData = NameData;
    var PlayerExperienceInformation = (function () {
        function PlayerExperienceInformation() {
            this.kind = "games#player";
        }
        return PlayerExperienceInformation;
    })();
    GoogleGameDev.PlayerExperienceInformation = PlayerExperienceInformation;
    var PlayerLevel = (function () {
        function PlayerLevel() {
            this.kind = "games#playerLevel";
        }
        return PlayerLevel;
    })();
    GoogleGameDev.PlayerLevel = PlayerLevel;
})(GoogleGameDev || (GoogleGameDev = {}));
var GoogleGameDev;
(function (GoogleGameDev) {
    var Stats = (function () {
        function Stats() {
            this.kind = "games#statsResponse";
        }
        return Stats;
    })();
    GoogleGameDev.Stats = Stats;
})(GoogleGameDev || (GoogleGameDev = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var Piece = (function (_super) {
        __extends(Piece, _super);
        function Piece(game, texture) {
            _super.call(this, game, 0, 0, texture);
            game.add.existing(this);
        }
        Piece.prototype.canCombine = function (other) {
            if (other == null || other == undefined) {
                return false;
            }
            return this.type == other.type;
        };
        Piece.prototype.delete = function () {
            console.log("Deleté");
            this.kill();
        };
        return Piece;
    })(Phaser.Sprite);
    PhaserCordovaGame.Piece = Piece;
    PhaserCordovaGame.NombreTypePiece = 4;
    (function (TypePiece) {
        TypePiece[TypePiece["Vert"] = 0] = "Vert";
        TypePiece[TypePiece["Rouge"] = 1] = "Rouge";
        TypePiece[TypePiece["Bleu"] = 2] = "Bleu";
        TypePiece[TypePiece["Jaune"] = 3] = "Jaune";
    })(PhaserCordovaGame.TypePiece || (PhaserCordovaGame.TypePiece = {}));
    var TypePiece = PhaserCordovaGame.TypePiece;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceBleu = (function (_super) {
        __extends(PieceBleu, _super);
        function PieceBleu(game) {
            _super.call(this, game, PhaserCordovaGame.AssetKeys.assetBillebleu);
            this.type = PhaserCordovaGame.TypePiece.Bleu;
        }
        PieceBleu.prototype.canCombine = function (other) {
            if (other == null || other == undefined) {
                throw new ReferenceError("Impossible de comparer à null");
            }
            return this.type == other.type || other.type == PhaserCordovaGame.TypePiece.Jaune;
        };
        return PieceBleu;
    })(PhaserCordovaGame.Piece);
    PhaserCordovaGame.PieceBleu = PieceBleu;
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
                case PhaserCordovaGame.TypePiece.Bleu:
                    result = new PhaserCordovaGame.PieceBleu(game);
                    break;
                case PhaserCordovaGame.TypePiece.Jaune:
                    result = new PhaserCordovaGame.PieceJaune(game);
                    break;
                default:
                    throw new TypeError("Type de piece non géré");
            }
            result.anchor = new Phaser.Point(0.5, 0.5);
            return result;
        };
        PieceFactory.CreatePieceRandom = function (game) {
            return PieceFactory.CreatePiece(game, Math.floor(Math.random() * PhaserCordovaGame.NombreTypePiece));
        };
        return PieceFactory;
    })();
    PhaserCordovaGame.PieceFactory = PieceFactory;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceJaune = (function (_super) {
        __extends(PieceJaune, _super);
        function PieceJaune(game) {
            _super.call(this, game, PhaserCordovaGame.AssetKeys.assetBilleJaune);
            this.type = PhaserCordovaGame.TypePiece.Jaune;
        }
        PieceJaune.prototype.canCombine = function (other) {
            if (other == null || other == undefined) {
                throw new ReferenceError("Impossible de comparer à null");
            }
            return this.type == other.type || other.type == PhaserCordovaGame.TypePiece.Bleu;
        };
        return PieceJaune;
    })(PhaserCordovaGame.Piece);
    PhaserCordovaGame.PieceJaune = PieceJaune;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
var PhaserCordovaGame;
(function (PhaserCordovaGame) {
    var PieceRouge = (function (_super) {
        __extends(PieceRouge, _super);
        function PieceRouge(game) {
            _super.call(this, game, PhaserCordovaGame.AssetKeys.assetBillerouge);
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
            _super.call(this, game, PhaserCordovaGame.AssetKeys.assetBilleVert);
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
        ArrayUtil.contains = function (arrayToTest, elementToFind) {
            return arrayToTest.indexOf(elementToFind) !== -1;
        };
        ArrayUtil.containsArray = function (arrayToTest, elementToFind) {
            for (var i = 0; i < arrayToTest.length; i++) {
                var elem = arrayToTest[i];
                if (elem.length === elementToFind.length) {
                    var allOk = true;
                    for (var j = 0; j < elem.length; j++) {
                        allOk = allOk && (elem[j] == elementToFind[j]);
                    }
                    if (allOk)
                        return true;
                }
            }
            return false;
        };
        ArrayUtil.decalePiece = function (arrayOfPiece, indexMax) {
            for (var pos = indexMax; pos > 0; pos--) {
                arrayOfPiece[pos] = arrayOfPiece[pos - 1];
            }
            arrayOfPiece[0] = null;
        };
        return ArrayUtil;
    })();
    PhaserCordovaGame.ArrayUtil = ArrayUtil;
})(PhaserCordovaGame || (PhaserCordovaGame = {}));
//# sourceMappingURL=appBundle.js.map