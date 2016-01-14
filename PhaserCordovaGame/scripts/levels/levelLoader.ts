module PhaserCordovaGame {
    export class LevelLoader {

        func: (data: LevelData) => any;

        public readLevel(levelNumber: number, func: (data: LevelData) => any) {
            var request = new XMLHttpRequest();
            this.func = func;
            request.onload = this.readResponse.bind(this);
            request.open("get", "levels/level" + levelNumber + ".json", true);
            request.send();
        }

        public readResponse(ev: Event) {
            var result = ev.currentTarget as XMLHttpRequest;
            this.func(JSON.parse(result.responseText));
        }
    }


    export class LevelData {
        tailleX: number;
        tailleY: number;
        data: Array<Array<number>>;

        constructor() {
            this.data = new Array<Array<number>>();
        }
    }
}