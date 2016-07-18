module PhaserCordovaGame {
    export class GameDataService {

        private persistance: PersistenceService;
        private levelFinished: number[];
        private scores: {
            [k: number]: number
        }

        constructor() {
            this.persistance = new PersistenceService();
            this.levelFinished = this.persistance.getLevelFinished();
            this.scores = this.persistance.getScores();
            console.log(this.scores);
            console.log(this.levelFinished);
        }

        public saveData() {
            this.persistance.writeLevelFinished(this.levelFinished);
            this.persistance.writeScores(this.scores);
        }

        public addLevelFinished(level: number): boolean {
            if (this.levelFinished.indexOf(level) !== -1) {
                return false;
            }
            this.levelFinished.push(level);
            this.saveData();
            console.log("level finished: level " + level );
            return true;
        }

        public addScore(level: number, score: number) : boolean {
            if (this.scores[level]) {
                if (this.scores[level] <= score) {
                    return false
                }
            }
            this.scores[level] = score;
            this.saveData();
            console.log("Score added : level " + level + " score : " + score);
            return true;
        }

        public isLevelFinished(level: number): boolean {
            return this.levelFinished.indexOf(level) !== -1;
        }

        public getScore(level: number): number {
            return this.scores[level];
        }

        public getScores(): {
            [k: number]: number
        } {
            return this.scores;
        }
    }
}