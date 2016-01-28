module PhaserCordovaGame {
    export class LevelLoader {

        levelFileContent : LevelsFileData;

        constructor() {
          
        }

        public storeLevelData() {

            var request = new XMLHttpRequest();
            request.onload = this.storeLevelDataresponse.bind(this);
            request.open("get", "levels/levels.json", true);
            request.send();
        }

        private storeLevelDataresponse(ev: Event) {
            var result = ev.currentTarget as XMLHttpRequest;
            this.levelFileContent = JSON.parse(result.responseText);
        }

        public readLevel(levelNumber: number): LevelFileData {
            if (this.levelFileContent.levelBegin <= levelNumber && this.levelFileContent.levelEnd >= levelNumber) {

                return this.levelFileContent.levels[levelNumber];
            }
            else {
                alert("Level " + levelNumber + " invalid");
            }
            return null
        }

        public getNumberOfLevels(): number {
            return this.levelFileContent.levelEnd;
        }
    }

    export class LevelsFileData {
        public levelBegin: number;
        public levelEnd: number;
        public levels: { [k: number]: LevelFileData };
    }

    export class LevelFileData {
        level: number;
        sizeX: number;
        sizeY: number;
        data: number[];
    }


}