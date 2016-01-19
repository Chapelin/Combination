module GoogleGameDev {
    export class ApiHelper {
        token: GoogleApiOAuth2TokenObject;
        baseUrl: string = "https://www.googleapis.com/games/v1/";

        constructor() {
           
        }

        launchAuth(callback: () => void) {

        }

        initToken(tok: GoogleApiOAuth2TokenObject) {
            this.token = tok;
        }

        callBackAuth(token: GoogleApiOAuth2TokenObject) {
            this.token = token
          
        }

        public getListAchievements(callback: (response:AchievementDefinitionsListResponse)  =>  any, context? : any ){
            gapi.auth.setToken(this.token)
            gapi.client.request({
                path: this.baseUrl + "achievements",
                method: "GET",
                callback: callback.bind(context)
            }
            );
        }
    }
}