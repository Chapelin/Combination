module PhaserCordovaGame {
    export class PersistenceService {
        static levelFinishedKey: string = "LevelFinished";
        static scoreKey: string = "LevelScore";
        public addLevelFinished


        public writeLevelFinished(levels: number[]) {
            localStorage.setItem(PersistenceService.levelFinishedKey, JSON.stringify(levels));
        }

        public writeScores(scores: { [k: number]: number }) {
            localStorage.setItem(PersistenceService.scoreKey, JSON.stringify(scores));
        }

        public getLevelFinished(): number[] {
            var result = localStorage.getItem(PersistenceService.levelFinishedKey);
            return result === null ? new Array<number>(): result;
        }
        public getScores(): { [k: number]: number } {
            var result = localStorage.getItem(PersistenceService.scoreKey);
            return result === null ? {} : result;
        }
    }
}