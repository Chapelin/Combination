module GoogleGameDev {
    export class Application {
        public kind: string = "games#application";
        public id: string;
        public name: string;
        public author: string;
        public description: string;
        public category: ApplicationCategory;
        public assets: ImageAsset;
        public instances: Instance[];
        public lastUpdatedTimestamp: number;
        public achievement_count: number;
        public leaderboard_count: number;
        public enabledFeatures: string[];
        
    }

    export class ApplicationCategory {
        public kind: string = "games#applicationCategory";
        public primary: string;
        public secondary: string;
    }

    export class ImageAsset {
        public kind: string = "games#imageAsset";
        public name: string;
        public width: number;
        public height: number;
        public url: string;
    }

    export class Instance {
        public kind: string = "games#instance";
        public platformType: string;
        public name: string;
        public turnBasedPlay: boolean;
        public realtimePlay: boolean;
        public acquisitionUri: string;
        public androidInstance: InstanceAndroidDetails;
        public iosInstance: InstanceIosDetails;
        public webInstance: InstanceWebDetails;
    }

    export class InstanceAndroidDetails {
        public kind: string = "games#instanceAndroidDetails";
        public packageName: string;
        public enablePiracyCheck: boolean;
        public preferred: boolean;
    }

    export class InstanceIosDetails {
        public kind: string = "games#instanceIosDetails";
        public supportIphone: boolean;
        public supportIpad: boolean;
        public bundleIdentifier: string;
        public itunesAppId: string;
        public preferredForIphone: boolean;
        public preferredForIpad: boolean;
    }

    export class InstanceWebDetails {
        public kind: string = "games#instanceWebDetails";
        public launchUrl: string;
        public preferred: boolean;
    }
}