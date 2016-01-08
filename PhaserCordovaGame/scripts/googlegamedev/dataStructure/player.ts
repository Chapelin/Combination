module GoogleGameDev {
    export class Player {
        public kind: string = "games#player";
        public playerId: string;
        public displayName: string;
        public avatarImageUrl: string;
        public lastPlayedWith: Played;
        public name: NameData;
        public experienceInfo: PlayerExperienceInformation;
        public title: String;
    }

    export class Played {
        public kind: string = "games#played";
        public timeMillis: number;
        public autoMatched: boolean;

    }

    export class NameData {
        public familyName: string;
        public givenName: string;
    }

    export class PlayerExperienceInformation {
        public kind: string = "games#player";
        public currentExperiencePoints: number;
        public lastLevelUpTimestampMillis: number;
        public currentLevel: PlayerLevel;
        public nextLevel: PlayerLevel;
    }

    export class PlayerLevel {
        public kind: string = "games#playerLevel";
        public level: number;
        public minExperiencePoints: number;
        public maxExperiencePoints: number;
    }

}