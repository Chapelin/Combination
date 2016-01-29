module PhaserCordovaGame {
    export class FileService {
        static fileKey: string = "GemsEater";

        public  writeData(data: FileData) {
            localStorage.setItem(FileService.fileKey, JSON.stringify(data));
        }

        public getData(): FileData {
            if (!localStorage.getItem(FileService.fileKey)) {
                this.writeData(new FileData);
            }
            return localStorage.getItem(FileService.fileKey);
        }

    }
}