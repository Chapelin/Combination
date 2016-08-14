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
        callBackNmbreCoups: (a: number) => void;
        callBackScore: (a: number) => void;
        playMode: PlayMode;

        constructor(game: Phaser.Game, callbackCoup: (a: number) => void, callBackscore : (a:number) => void, playMode: PlayMode = PlayMode.Puzzle) {
            super(game, null, "plateau", true);
            this.callBackNmbreCoups = callbackCoup;
            this.callBackScore = callBackscore;
            this.playMode = playMode;
            this.razNombreCoup();
            this.pieces = [];
        }

        // appelé une fois tous les evenemtns résolus
        private acceptInput() {
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    var p = this.pieces[x][y];
                    if (p !== null && p !== undefined) {
                        p.inputEnabled = true;
                    }
                }
            }
        }

        // Calcule l'echelle à utiliser sur les pieces, à lancer au demarrage du plateau
        private processScale() {
            var p = PieceFactory.CreatePiece(this.game, TypePiece.Vert);
            var originalHeight = p.texture.height
            this.scaleDefaultPiece = new Phaser.Point(this.pas / originalHeight, this.pas / originalHeight);
            p.kill();
        }

        // créé les animations de deplacement des pieces qui  bougent
        private refreshPosition() {
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
                        // on le rend clickable si besoin
                        if (p.isClickable) {
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

        // Point d'entrée pour le mode infini
        public loadPlateauForInfinite(tx: number, ty: number) {
            this.taillePlateauX = tx;
            this.taillePlateauY = ty;
            this.pas = (SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            this.processScale();
            this.fillWholeRandom();

        }

        // Peuple le plateau en se basant sur un objet d'information de niveau
        public loadPlateauFromLevelData(data: LevelFileData) {
            this.taillePlateauX = data.sizeX;
            this.taillePlateauY = data.sizeY;
            this.pas = (SimpleGame.realWidth * 0.8) / this.taillePlateauX;
            this.processScale();
            this.currentLevel = data.level;

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
            this.updatePlateau();

        }

        /* MEt à jour le plateau : 
         1 - Lance le calcul des chutes
         2 - Supprime les lignes/colonnes inutiles (mode puzzle)
            OU
          2 - Genere de nouvelles pieces (mode inifni)
          3 - Créé et lance les animations de chutee
        */
        private updatePlateau() {
            this.fallingDown();
            // On ne crop le plateau qui si on est en mode puzzle
            if (this.playMode === PlayMode.Puzzle) {
                this.cropPlateauSize();

            }
            // si on est en infinit : on gènere de nouvelles pieces
            else if (this.playMode === PlayMode.Infinite) {
                this.fillMissingRandom();
            }
            this.refreshPosition();
        }

        // REmpli le plateau de pieces aléatoires
        private fillWholeRandom() {
            this.pieces = [];
            for (var x = 0; x < this.taillePlateauX; x++) {
                this.pieces[x] = [];
                for (var y = 0; y < this.taillePlateauY; y++) {
                    this.pieces[x].push(PieceFactory.CreatePieceRandomWeighted(this.game, this.scaleDefaultPiece));
                }
            }
            this.updatePlateau();
        }

        // Rempli le plateau de pieces aléaoitre par le haut (cad on prend en compte les obstacles)
        private fillMissingRandom() {
            for (var x = 0; x < this.taillePlateauX; x++) {
                for (var y = 0; y < this.taillePlateauY; y++) {
                    
                    if (!this.pieces[x][y]) {
                        this.pieces[x][y] = PieceFactory.CreatePieceRandomWeighted(this.game, this.scaleDefaultPiece);
                    } else if (this.pieces[x][y] instanceof PieceObstacle) {
                        //un obstacle : on arrete d'ajouter des pieces ici
                        break;
                    }
                }
            }
        }

        // Met en place un enement de click sur une piece
        private setupClickEventPiece(p: Piece, x: number, y: number) {
            p.inputEnabled = false;
            p.events.onInputUp.removeAll();
            p.events.onInputUp.addOnce((a, b, c, posX, posY) => {
                this.combineZone(posX, posY);
            }, this, 0, x, y);
        }

        // Indique si toutes les animations bloquant sont finies
        private tweensFinished(): boolean {
            return this.listTweenBloquant.every((v) => {
                return !v.isRunning;
            });
        }

        // calcule la zone combinatoire (pieces identiques se touchant)
        private getZoneCombine(x: number, y: number): Array<Array<number>> {
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

        // REtourne la liste des voisin d'une piece pouvant se combiner avec
        private findValidNeighbors(x: number, y: number): Array<Array<number>> {
            var listNeigbor = this.getNeigbhor(x, y);
            var p = this.pieces[x][y];
            return this.selectNeighborForCombine(p, listNeigbor);
        }

        // REtourne la liste des pieces voisines d'une position
        private getNeigbhor(x: number, y: number): Array<Array<number>> {
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

        // Retourne la liste des positions de voisines d'une pieces
        private selectNeighborForCombine(origine: Piece, potentiels: Array<Array<number>>): Array<Array<number>> {
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

        // Lance la combination de pieces (gestion de la zone, lancement de la suppression & effets de bord, repeuplement ensuite)
        private combineZone(x: number, y: number) {
            var listToDelete = new Array<Piece>();
            var listOfCoord = new Array<Array<number>>();
            // s'il peut etre seul : il peut declencher une zone
            if (this.pieces[x][y].canBeAlone) {
                listOfCoord.push([x, y]);
            }

            else {
                listOfCoord = this.getZoneCombine(x, y);
                if (listOfCoord.length <= 1) {
                    return;
                }
            }
           
            var compteurNombreSupprime: number = 0;
            // pour chaque element à supprimer
            for (var iCoord = 0; iCoord < listOfCoord.length; iCoord++) {
                var pos = listOfCoord[iCoord];
                var p = this.pieces[pos[0]][pos[1]];
                // s'il est existant
                if (p !== null && p !== undefined) {
                    // s'il peut killer des elements
                    if (p.canDeleteMore) {
                        // on lui laisse calculer
                        var adding = p.processMore(pos[0], pos[1], this.taillePlateauX, this.taillePlateauY);
                        // et on les ajoute à la liste à traiter
                        for (var i = 0; i < adding.length; i++) {
                            var temp = adding[i];
                            if (this.pieces[temp[0]][temp[1]]) {
                                listOfCoord.push(temp);
                            }
                        }
                    }
                    // puis on supprime l'element traité
                    listToDelete.push(p);
                    this.pieces[pos[0]][pos[1]] = null;
                    compteurNombreSupprime++;
                }
            }

            // pour chaque element supprimé, on prépare l'animation
            listToDelete.forEach((p: Piece) => {
                var tween = this.game.add.tween(p.scale);
                tween.to(
                    {
                        x: 0.01,
                        y: 0.01
                    }, GameConfiguration.GAMEANIM_SPEED_FADE, Phaser.Easing.Exponential.Out, false);
                this.listTweenBloquant.push(tween);
            });

            // puis on les execute tous, et lorsque le dernier l'est, on nettoye et verifie la fin
            this.listTweenBloquant.forEach((v: Phaser.Tween, i: number, arr: Phaser.Tween[]) => {
                v.onComplete.addOnce(() => {
                    // si tous les tweens sont finis
                    if (this.tweensFinished()) {
                        this.updatePlateau();
                        this.checkEndCondition();
                    }
                }, this);
                v.start();
            });
            this.majNombreCoup(compteurNombreSupprime);
        }

       // Verifie si une condition de gain ou perte est vraie.
        private checkEndCondition() {
            if (this.taillePlateauX === 0) {
                // gagné :)
                this.game.state.start(stateLevelWon, false, false, this.currentLevel, this.nombreCoups);

            } else {
                var flagPasPerdu = false;
                // parcours ud tableau, s'il y a au moins une combinaison,flagPasPerdu est à True
                for (var x = 0; x < this.taillePlateauX && !flagPasPerdu; x++) {
                    for (var y = 0; y < this.taillePlateauY && !flagPasPerdu; y++) {
                        var p = this.pieces[x][y];

                        if (p !== null && p !== undefined) {
                            flagPasPerdu = flagPasPerdu || p.canBeAlone;
                            flagPasPerdu = flagPasPerdu || this.getZoneCombine(x, y).length > 1;
                        }
                    }
                }
                // si pas de combinason possible
                if (!flagPasPerdu) {
                    if (this.playMode === PlayMode.Puzzle) {
                        this.game.state.start(stateGameOver, true, false, this.currentLevel);
                    }
                    else {
                        console.log("FINI");
                    }
                }
                // si que des simples : Perdu
            }
        }


        // Fait tomber les pieces en prenant en compte les obstacles
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
                            ArrayUtil.decalePiece(this.pieces[x], y, hautDuCrochet + 1);
                        }

                    }
                }
            }
        }

        // Reduit la taille logique du plateau selon les colonnes/lignes vides
        private cropPlateauSize() {
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

        private majNombreCoup(nmbreSupprime: number) {
            this.nombreCoups++;
            this.refreshCompteurVisuel(nmbreSupprime);
        }
        private razNombreCoup() {
            this.nombreCoups = 0;
            this.refreshCompteurVisuel(0);
        }

        private refreshCompteurVisuel(nmbreSupprime: number) {
            if (this.callBackNmbreCoups) {
                this.callBackNmbreCoups(this.nombreCoups);
            }
            if (this.callBackScore) {

                this.callBackScore(nmbreSupprime);
            }
        }

    }
}