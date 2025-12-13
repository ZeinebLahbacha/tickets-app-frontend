import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';            // ton composant racine (app.ts)
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes'; // assure-toi que le chemin est correct

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));
