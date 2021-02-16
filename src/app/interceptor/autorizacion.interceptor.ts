import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { AuthService } from '../services/services.index';
import { finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Injectable()
export class AutorizacionInterceptor implements HttpInterceptor {

    

  constructor(private authService: AuthService,private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
   Observable<HttpEvent<any>> {
    console.log("AutorizacionInterceptor");  

	return next.handle(req).pipe(

        catchError(e=>{

            if(e.status ==401 || e.status ==403){
                if(this.authService.estaAutenticado()){
                    this.authService.logout();
                }
                this.router.navigate(['/login']);

            }else if(e.status ==500 || e.status ==504  ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error en el sistema',
                    text: 'Ponerse en contacto con el administrador',
                    footer: detalleError
                  });
            } if(e.status ==404 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'info',
                    title: 'No se pudo realizar la operación',
                    text: detalleError
                  });
            }
            
            /*else if(e.status !=200 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'warning',
                    title: 'No se pudo realizar la operación',
                    text: detalleError
                  });

            }
            */
            

            return throwError(e);
            
        })
    );
	
  }

}