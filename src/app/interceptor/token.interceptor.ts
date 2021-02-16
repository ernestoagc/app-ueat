import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/services.index';
import { finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    

  constructor(private authService: AuthService,private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
   Observable<HttpEvent<any>> {
    console.log("autority");


    let token = this.authService.token;

    if(token!=null){
        const authReq = req.clone({
            headers:req.headers.set('Authorization', 'Bearer  '+token)
        });
        return next.handle(authReq);
    }

	return next.handle(req);
	
  }

}