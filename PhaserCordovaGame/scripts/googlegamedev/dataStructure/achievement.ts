module GoogleGameDev {
    export class AchievementDefinitionsListResponse {
        public kind: string = "games#achievementDefinitionsListResponse";
        public nextPageToken: string;
        public items: AchievementDefinitions[];
    }

    export class AchievementDefinitions {
        public kind: string = "games#achievementDefinition";
        public id: string;
        public name: string;
        public description: string;
        public achievementType: string;
        public totalSteps: number;
        public formattedTotalSteps: string;
        public revealedIconUrl: string;
        public isRevealedIconUrlDefault: boolean;
        public unlockedIconUrl: string;
        public isUnlockedIconUrlDefault: boolean;
        public initialState: string;
        public experiencePoints: number;
    }

}