=================================
intégration de l'extension angular-oauth2-oidc pour authentification via oauth2/oidc
--------------------------------
npm i -s angular-oauth2-oidc

* add a copy of silent-refresh.html in /src
et ajouter "src/silent-refresh.html" dans le premier bloc assets de angular.json (près de la ligne 40)
"assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              "src/silent-refresh.html"
            ],

* add provideOAuthClient() in app.config.ts  (angular >=17)
+ code de Oauth2LogInOutComponent , service/OAuth2SessionService , UserSession in shared/data or d2f-ngx-session
et tenir compte du fait que le token s'appelle "access_token" (et pas token si authToken) dans intercepteur et/ou gardien
