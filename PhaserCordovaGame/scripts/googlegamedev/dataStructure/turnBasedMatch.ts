module GoogleGameDev {
    export class TurnBasedMatch {
        public kind: string = "games#turnBasedMatch";
        public matchId: string;
        public applicationId: string;
        public variant: number;
        public status: string;
        public userMatchStatus: string;
        public participants: TurnBasedMatchParticipant[];
        public creationDetails: TurnBasedMatchModification;
        public lastUpdateDetails: TurnBasedMatchModification;
        public autoMatchingCriteria: TurnBasedAutoMatchingCriteria;
        public data: TurnBasedMatchData;
        public results: ParticipantResult[];
        public inviterId: string;
        public withParticipantId: string;
        public description: string;
        public pendingParticipantId: string;
        public matchVersion: number;
        public rematchId: string;
        public matchNumber: number;
        public previonMatchData: TurnBasedMatchData;

    }

    export class TurnBasedMatchParticipant {
        public kind: string = "games#turnBasedMatchParticipant";
        public id: string;
        public player: GoogleGameDev.Player;
        public autoMatchedPlayer: AnonymousPlayer;
        public autoMatched: boolean;
        public status: string;
    }

    export class TurnBasedMatchModification {
        public kind: string = "games#turnBasedMatchModification";
        public participantId: string;
        public modifiedTimestampMillis: number;
    }

    export class TurnBasedAutoMatchingCriteria {
        public kind: string = "games#turnBasedAutoMatchingCriteria";
        public minAutoMatchingPlayers: number;
        public maxAutoMatchingPlayers: number;
        public exclusiveBitmask: number;
    }

    export class TurnBasedMatchData {
        public kind: string = "games#turnBasedMatchData";
        public dataAvailable: boolean;
        public data: Uint8Array; // byte array
    }

    export class ParticipantResult {
        public kind: string = "games#participantResult";
        public participantId: string;
        public result: string;
        public placing: number;
    }

    export class AnonymousPlayer {
        public kind: string = "games#anonymousPlayer";
        public displayName: string;
        public avatarImageUrl: string;
    }
}