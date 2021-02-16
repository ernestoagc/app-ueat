import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

import{NoCommaPipe}  from './../pipe/no-comma.pipe';
import{SearchFilterPipe}  from './../pipe/search-filter.pipe';

import{LetterBoldPipe}  from './../pipe/letter-bold.pipe';



import { PagesComponent } from './pages.component'
import { SharedModule } from '../shared/shared.module';

//Rutas
import {APP_ROUTES} from './../app.routes';
import {InfiniteScrollModule } from 'ngx-infinite-scroll'
import { NgxSpinnerModule } from 'ngx-spinner';

import {AutocompleteLibModule} from 'angular-ng-autocomplete'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscarSolicitudComponent } from './solicitudes/buscar-solicitud/buscar-solicitud.component';

@NgModule({
  declarations: [
    SolicitudesComponent,
    SolicitudComponent,
    NoCommaPipe,
    SearchFilterPipe,
    LetterBoldPipe,
    PagesComponent,
    BuscarSolicitudComponent],
  imports: [
    APP_ROUTES,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,InfiniteScrollModule ,NgxSpinnerModule,AutocompleteLibModule
  ],
  exports:[
    SolicitudesComponent,
    SolicitudComponent,
    PagesComponent,
    NoCommaPipe,SearchFilterPipe,LetterBoldPipe
  ]
})
export class PagesModule { }
