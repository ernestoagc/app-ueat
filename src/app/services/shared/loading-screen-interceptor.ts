import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingScreenService } from './loading-screen.service';
import { finalize, catchError } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';


@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

  activeRequests = 0;

  constructor(private loadingScreenService: LoadingScreenService,private router:Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepto");
    
    if (this.activeRequests === 0) {
      this.loadingScreenService.startLoading();
    }

    this.activeRequests++;
    return next.handle(request).pipe(

    
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingScreenService.hideLoading();
        }
      })
          

      
    );
  }

}