import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import{Usuario} from '../../modelo/modelo.index'
import { AppConstantes} from '../../util/constante'
import swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint:string=AppConstantes.autenticacionApiUrl;

  private _usuario:Usuario;
  private _token:string;

  public get usuario(){
    if(this._usuario !=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
      this._usuario=JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token():string{
    if(this._token !=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token=sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  constructor(private http:HttpClient,) { }

  login(usuario:Usuario):Observable<any>{

    const credenciales = btoa('angularApp' + ':'+'12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + credenciales  });


    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.codigo);
    params.set('password',usuario.clave);
      console.log("params: "+params.toString());
    return this.http.post(this.urlEndPoint+'/oauth/token',params.toString(),{headers:httpHeaders});
  
  }


  
  guardarUsuario(accessToken:string){
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario=new Usuario(); 
    console.log(JSON.stringify(payload));
    this._usuario.codigo=payload.user_name;
    this._usuario.email=payload.email;
    this._usuario.roles=payload.authorities;

    console.log("usuario guardarSesion: " + JSON.stringify(this._usuario));
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }

  guardarToken(accessToken:string){

    this._token=accessToken;
    console.log("tokenGuardarSesion: " + this._token);
    sessionStorage.setItem('token',accessToken);

  }

  obtenerDatosToken(accessToken:string):any{ 
    if(accessToken!=null){ 
      return   JSON.parse(atob(accessToken.split(".")[1]));
    } 
    return null;
    
  }

  estaAutenticado():boolean{

    
    let payload = this.obtenerDatosToken(this.token);
    
    if(payload !=null && payload.user_name!=null ){
      console.log("estaAutenticado+3");
      return true;
     
    }

    console.log("estaAutenticado+4");
    return false;

    
  }

  logout():void{
    this._token=null;
    this._token=null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

  }



}
