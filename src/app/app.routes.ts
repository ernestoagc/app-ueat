import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { PagesComponent } from './pages/pages.component';
import {LoginComponent} from './login/login.component';

import {AutorizacionGuard} from './guard/autorizacion.guard';


const appRoutes: Routes = [    
    { path: 'login', component: LoginComponent },
    {path:'',component:PagesComponent, canActivate:[AutorizacionGuard] ,
        children:[
            { path: 'solicitud', component: SolicitudComponent },
            { path: 'solicitudes', component: SolicitudesComponent},
            { path: 'solicitudes/page/:page', component: SolicitudesComponent },
            { path: 'solicitud/:id', component: SolicitudComponent, },
            { path: '', redirectTo:'/solicitudes',pathMatch:'full'},
        ]
    },
   
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:false, scrollPositionRestoration:'enabled'})
