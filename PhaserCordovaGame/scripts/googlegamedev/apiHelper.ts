module GoogleGameDev {
    export class ApiHelper {
        token: GoogleApiOAuth2TokenObject;
        baseUrl: string = "https://www.googleapis.com/games/v1/";
        authWindows: InAppBrowser;

        launchAuth(key: string) {
            var url = "https://accounts.google.com/o/oauth2/auth?client_id=" + key + "&scope=https://www.googleapis.com/auth/games&response_type=token&redirect_uri=http://localhost";
            this.authWindows = window.open(url, '_blank', 'location=no,toolbar=no');
            this.authWindows.addEventListener('loadstart', this.started.bind(this));
        }

        started(data: InAppBrowserEvent) {

            var url = data.url;

            if (url.indexOf("#access_token") > -1) {
                this.authWindows.close();
                var reg = new RegExp("access_token=(.+?)&.*&expires_in=(\\d*)");
                var res = reg.exec(url);
                var token = res[1];
                var expires = res[2];
                var dataToken: GoogleApiOAuth2TokenObject;
                dataToken = {
                    access_token: token,
                    error: null,
                    expires_in: expires,
                    state: null
                };
                this.token = dataToken;
            }
        }

        initToken(tok: GoogleApiOAuth2TokenObject) {
            this.token = tok;
        }

        callBackAuth(token: GoogleApiOAuth2TokenObject) {
            this.token = token

        }

        public getListAchievements(callback: (response: AchievementDefinitionsListResponse) => any, context?: any) {
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