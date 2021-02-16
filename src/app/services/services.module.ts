import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitudService, LoadingScreenInterceptor,LoadingScreenService } from '../services/services.index'

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ModalService } from './shared/modal.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule

  ],
  providers:[
    SolicitudService,
    ModalService,
    LoadingScreenService,{
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ]
})
export class ServiceModule { }
