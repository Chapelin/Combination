module GoogleGameDev {
    export class Stats {
        public kind: string = "games#statsResponse";
        public num_purchases: number;
        public spend_percentile: number;
        public days_since_last_played: number;
        public num_sessions: number;
        public num_sessions_percentile: number;
        public avg_session_length_minutes: number;
        public churn_probability: number;
    }
}