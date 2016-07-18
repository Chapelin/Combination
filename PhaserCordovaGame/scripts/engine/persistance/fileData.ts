module PhaserCordovaGame {
    export class FileData {
        levelFinished: number[];
        scores: {
            [k: number]: number
        }

        constructor() {
            this.levelFinished = [];
            this.scores = {}
        }
    }
}