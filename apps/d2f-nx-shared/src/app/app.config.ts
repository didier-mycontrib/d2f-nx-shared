import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myAuthInterceptor } from './common/interceptor/my-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes) ,
    provideHttpClient(withInterceptors([myAuthInterceptor]))  ,
    provideOAuthClient()
  ],
};
