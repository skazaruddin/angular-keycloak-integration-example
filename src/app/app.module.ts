import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecuredComponent } from './secured/secured.component';
import { HomeComponent } from './home/home.component';
import { SecuredHttpInterceptor } from './core/interceptor/secured-http.interceptor';
import { KeycloakService } from './core/auth/keycloak.service';
import { CreateUserPageComponent } from './pages/user-management/create-user-page/create-user-page.component';
import { GroupRestrictedModule } from './group-restricted/group-restricted.module';





export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

const keycloakService = new KeycloakService();



@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    NotfoundComponent,
    SecuredComponent,
    HomeComponent,
    CreateUserPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    GroupRestrictedModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    },
    AuthGuardService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: SecuredHttpInterceptor,
        multi: true
    },
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    keycloakService
      .init()
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');
        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}