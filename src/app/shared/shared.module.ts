import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Rutas
import {APP_ROUTES} from '../app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  
  declarations:[SidebarComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent
],
exports:[SidebarComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent
],
  imports: [
    CommonModule,
    APP_ROUTES
  ]
})
export class SharedModule { }
