import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';

//Rutas
import {APP_ROUTES} from './app.routes'


//servicios
import {ServiceModule} from './services/services.module';

//paginas
import { PagesModule} from './pages/pages.module';

//shared
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';

import {TokenInterceptor} from './interceptor/token.interceptor';
import {AutorizacionInterceptor} from './interceptor/autorizacion.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClickOutsideDirective
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    PagesModule,
    FormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AutorizacionInterceptor,
    multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
