import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/services.index';
import { ActivatedRoute,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {
 
 
  constructor(private authService:AuthService,private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.estaAutenticado()){
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }
  
}
