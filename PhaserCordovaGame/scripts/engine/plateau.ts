module PhaserCordovaGame {
    export class Plateau extends Phaser.Group {
        pieces: Array<Array<Piece>>;
        taillePlateauX: number;
        taillePlateauY: number;
        scaleDefaultPiece: Phaser.Point;
        pas: number;
        listTweenBloquant: Phaser.Tween[];
        nombreCoups: number;
        currentLevel: number;

        constructor(game: Phaser.Game, sizeX: number, sizeY: number) {
            super(game, null, "plateau", true);
            this.taillePlateauX = sizeX;
            this.taillePlateauY = sizeY;
            // X est plus petit que Y
        }

        private acceptInput() {
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    var p = this.pieces[x][y];
                    if (p !== null && p!== undefined){
                        p.inputEnabled = true;
                    }
                }
            }
        }

        private processScale() {
            var p = PieceFactory.CreatePiece(this.game, TypePiece.Vert);
            var originalHeight = p.texture.height
            this.scaleDefaultPiece = new Phaser.Point(this.pas / originalHeight, this.pas / originalHeight);
            p.kill();
        }

        public refreshPosition() {

            this.listTweenBloquant = new Array<Phaser.Tween>();
            var debutX = (SimpleGame.realWidth - (this.pas * (this.taillePlateauX - 1))) / 2
            var debutY = (SimpleGame.realHeight - ((this.taillePlateauY - 1) * this.pas)) / 2;
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    var p = this.pieces[x][y];
                    if (p !== null && p !== undefined) {
                        var tween = this.game.add.tween(p);
                        tween.to(
                            {
                                x: debutX + this.pas * x,
                                y: debutY + this.pas * y
                            }, GameConfiguration.GAMEANIM_SPEED_FALL, Phaser.Easing.Quartic.Out, false);
                        // si nouvellement créé
                        // on les place au dessus
                        if (p.x == 0 && p.y == 0) {
                            p.x = debutX + this.pas * x;
                            p.y = debutY - this.pas;
                        }

                        this.listTweenBloquant.push(tween);
                        // Si c'est pas un obstacle, on le rend clickable
                        if (!(p instanceof PieceObstacle)) {
                            this.setupClickEventPiece(p, x, y);
                        }
                    }
                }
            }

            this.listTweenBloquant.forEach((v: Phaser.Tween, i: number, arr: Phaser.Tween[]) => {
                v.onComplete.addOnce(() => {
                    // si tous les tweens sont finis
                    if (this.tweensFinished()) {
                        this.acceptInput();
                    }
                }, this);
                v.start();
            });

        }

        public loadPlateauFromLevelData(data: LevelFileData) {
            this.taillePlateauX = data.sizeX;
            this.taillePlateauY = data.sizeY;
            this.pas = (SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            this.processScale();
            this.currentLevel = data.level;
            this.nombreCoups = 0;
            this.pieces = [];
            for (var x = 0; x < this.taillePlateauX; x++) {
                this.pieces[x] = [];
                for (var y = 0; y < this.taillePlateauY; y++) {
                    var d: number = data.data[x + y * this.taillePlateauX];
                    if (d !== null) {
                        this.pieces[x][y] = PieceFactory.CreatePiece(this.game, d, this.scaleDefaultPiece);
                    }
                    else {
                        this.pieces[x][y] = null;
                    }
                }
            }

            this.fallingDown();
            this.reduceSize();
            this.refreshPosition();
        }

        public setupClickEventPiece(p: Piece, x: number, y: number) {


            p.inputEnabled = false;
            p.events.onInputUp.removeAll();
            p.events.onInputUp.addOnce((dummy, dummy2, dummy3, posX, posY) => {

                this.combineZone(posX, posY);

            }, this, 0, x, y);
        }

        public tweensFinished(): boolean {
            return this.listTweenBloquant.every((v) => {
                return !v.isRunning;
            });
        }

        public getZoneCombine(x: number, y: number): Array<Array<number>> {
            var valid = [[x, y]];
            // valid change de taille en live
            for (var compteurDeTest = 0; compteurDeTest < valid.length; compteurDeTest++) {
                var current = valid[compteurDeTest];
                var temp = this.findValidNeighbors(current[0], current[1]);
                // on traite les voisins possibles
                for (var j = 0; j < temp.length; j++) {
                    var currentNeigbhor = temp[j];
                    // si le voisin n'a pas encore été prévu pour verification
                    if (!ArrayUtil.containsArray(valid, currentNeigbhor)) {
                        // on l'ajoute à la liste des valides à tester.
                        valid.push(currentNeigbhor);
                    }
                }
            }
            return valid;
        }

        public findValidNeighbors(x: number, y: number): Array<Array<number>> {
            var listNeigbor = this.getNeigbhor(x, y);
            var p = this.pieces[x][y];
            return this.selectNeighborForCombine(p, listNeigbor);
        }

        public getNeigbhor(x: number, y: number): Array<Array<number>> {
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
        }

        public selectNeighborForCombine(origine: Piece, potentiels: Array<Array<number>>): Array<Array<number>> {
            var result = [];
            potentiels.forEach((pos, i, res) => {
                var p = this.pieces[pos[0]][pos[1]]
                if (p !== null && p !== undefined) {
                    if (origine.canCombine(p)) {
                        result.push(pos);
                    }
                }
            }, this);
            return result;
        }

        public combineZone(x: number, y: number) {
            var listToDelete = new Array<Piece>();
            var listOfCoord = new Array<Array<number>>();

            if (this.pieces[x][y] instanceof PieceBombe) {
                listOfCoord = this.getZoneBombe(x, y);

            } else if (this.pieces[x][y] instanceof PieceLine) {
                listOfCoord = this.getZoneLine(x, y);

            } else {
                listOfCoord = this.getZoneCombine(x, y);
                if (listOfCoord.length <= 1) {
                    return;
                }
            }
            this.nombreCoups++;

            listOfCoord.forEach((pos, i, arr) => {
                var p = this.pieces[pos[0]][pos[1]];
                if (p !== null && p !== undefined) {
                    listToDelete.push(p);
                    this.pieces[pos[0]][pos[1]] = null;
                }
            });

            listToDelete.forEach((p: Piece) => {
                var tween = this.game.add.tween(p.scale);
                tween.to(
                    {
                        x: 0.01,
                        y: 0.01
                    }, GameConfiguration.GAMEANIM_SPEED_FADE, Phaser.Easing.Exponential.Out, false);
                this.listTweenBloquant.push(tween);
            });

            this.listTweenBloquant.forEach((v: Phaser.Tween, i: number, arr: Phaser.Tween[]) => {
                v.onComplete.addOnce(() => {
                    // si tous les tweens sont finis
                    if (this.tweensFinished()) {
                        this.fallingDown();
                        this.reduceSize();
                        this.refreshPosition();
                        this.checkEndCondition();
                    }
                }, this);
                v.start();
            });
        }

        private getZoneLine(x: number, y: number): number[][] {
            var potentials = new Array<Array<number>>();
            for (var i = 0; i < this.taillePlateauX; i++) {
                potentials.push([i, y]);
            }

            return potentials;
        }

        private getZoneBombe(x: number, y: number): number[][] {
            var potentials = new Array<Array<number>>();
            potentials.push([x, y]);
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

            if (x > 0 && y > 0) {
                potentials.push([x - 1, y - 1]);
            }
            if (x > 0 && y < this.taillePlateauY - 1) {
                potentials.push([x - 1, y + 1]);
            }
            if (x < this.taillePlateauX - 1 && y < this.taillePlateauY - 1) {
                potentials.push([x + 1, y + 1]);
            }
            if (x < this.taillePlateauX - 1 && y > 0) {
                potentials.push([x + 1, y - 1]);
            }

            return potentials;
        }

        private checkEndCondition() {
            if (this.taillePlateauX === 0) {
                // gagné :)
                this.game.state.start(stateLevelWon, false, false, this.currentLevel, this.nombreCoups);

            } else {
                var flagPasPerdu = false;
                // parcours ud tableau, s'il y a au moins une combinaison,flagPasPerdu est à True
                for (var x = 0; x < this.taillePlateauX; x++) {
                    for (var y = 0; y < this.taillePlateauY; y++) {
                        var p = this.pieces[x][y];

                        if (p !== null && p !== undefined) {
                            flagPasPerdu = flagPasPerdu || p.canBeAlone;
                            flagPasPerdu = flagPasPerdu || this.getZoneCombine(x, y).length > 1;
                        }
                    }
                }
                // si pas de combinason possible
                if (!flagPasPerdu) {
                    this.game.state.start(stateGameOver, true, false, this.currentLevel);
                }
                // si que des simples : Perdu
            }
        }

        private fallingDown() {
            // pour chaque X : on regarde les Y  depuis la fin
            // dès qu'on trouve un null, et qu'il n'y a pas que des null avant, on avance les precedents de 1
            // jusqu'a ce que ça soit bon
            // et on continue
            for (var x = 0; x < this.taillePlateauX; x++) {
                // on a un "obstacle" tout en haut
                var positionYObstacles = [-1];
                this.pieces[x].forEach((p, i, a) => {
                    if (p !== null && p !== undefined && p.type == TypePiece.Obstacle) {
                        positionYObstacles.push(i);
                    }
                });

                // et pareille tout en bas
                positionYObstacles.push(this.taillePlateauY);

                positionYObstacles = positionYObstacles.reverse();
                // parcours des positions d'obstacles
                for (var c = 1; c < positionYObstacles.length; c++) {
                    // tailleY
                    var basDuCrochet = positionYObstacles[c - 1];
                    // premier obstacle en remontant
                    var hautDuCrochet = positionYObstacles[c];

                    // si que des vides, on skip le crochet
                    if (this.pieces[x].slice(hautDuCrochet + 1, basDuCrochet).every((x, n, a) => x === null || x === undefined)) {
                        continue;
                    }

                    for (var y = basDuCrochet - 1; y > hautDuCrochet; y--) {

                        // si on a que des null au dessus, on arrete de bosser sur la zone
                        if (this.pieces[x].slice(hautDuCrochet + 1, y).every((x, n, a) => x === null || x === undefined)) {
                            break;
                        }

                        // ici on a au moins un non null au dessus
                        while (this.pieces[x][y] == null) {
                            ArrayUtil.decalePiece(this.pieces[x], y, hautDuCrochet+1);
                        }

                    }
                }
            }
        }

        private reduceSize() {
            // pour chaque ligne verticale, si elle est vide on reduit la taille du plateau en la virant
            var x = 0;
            do {
                var xVide = this.pieces[x].every((p: Piece) => {
                    return p === null || p === undefined;
                });
                if (xVide) {
                    this.taillePlateauX--;
                    // deplacer le tableau en virant la ligne vide
                    this.pieces.splice(x, 1);
                }
                else {
                    x++;
                }

            } while (x < this.taillePlateauX);
        }

    }
}