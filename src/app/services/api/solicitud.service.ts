import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'
import { AppConstantes} from '../../util/constante'
import { of, Observable, throwError } from 'rxjs';
import{Recomendacion} from '../../modelo/modelo.index'
import { ActivatedRoute,Router } from '@angular/router';
import {AuthService} from '../services.index'

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint:string=AppConstantes.solicitudApiUrl;
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
 
  constructor(private http:HttpClient,
    private router:Router, private authService:AuthService) { }


  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;

    if(token !=null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
    return this.httpHeaders;
  }


  listar():Observable<any>{
   return this.http.get(this.urlEndPoint+'findall' ,{headers:this.agregarAuthorizationHeader()}).pipe( 
     
    map (function(response:any) {    
        console.log("respuesta: =>");
        console.log(response);            
      return   response;
      }),
      catchError(e =>{
          if(this.isNoAutorizado(e)){
               console.error(e.error);
              return throwError(e);
          }
    
      })
  );
  }

  buscar(page:number,puesto:string,estado:string):Observable<any>{
    console.log("puesto:"+puesto);
    console.log("estado:"+estado);
    console.log("page:"+page);
    return this.http.get(this.urlEndPoint + `page/ ${page}?position=${puesto}`).pipe( 
       map (function(response:any) {    
         console.log("respuesta: =>");
         console.log(response);            
       return   response;
       }),
       catchError(e =>{
        return throwError(e);
       }) 
   );
   }

  obtener(id:number):Observable<Recomendacion>{
    return this.http.get(this.urlEndPoint +id).pipe( 
       map (function(response:Recomendacion) {    
         console.log("respuesta: =>");
         console.log(response);            
       return   response;
       }),
       catchError(e =>{
           if(this.isNoAutorizado(e)){
                console.error(e.error);
               return throwError(e);
           }
     
       })
   );
   
   
   }

  crear(recomendacion:Recomendacion):Observable<Recomendacion>{
    return this.http.post<Recomendacion>(this.urlEndPoint,recomendacion,{headers:this.httpHeaders});
  }

}
