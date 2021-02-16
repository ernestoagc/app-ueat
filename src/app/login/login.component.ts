import { Component, OnInit } from '@angular/core';
import{Usuario} from '../modelo/modelo.index';
import {AuthService} from '../services/services.index'
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario:Usuario;

  constructor(private authService:AuthService,private router:Router) { 
this.usuario=new Usuario();

  }

  ngOnInit(): void {
    if(this.authService.estaAutenticado()){
console.log("LOGIN_ESTA");
      this.router.navigate(['/solicitudes']);

      swal.fire({
        icon: 'success',
        title: 'Login',
        text: `${this.authService.usuario.codigo}. user is already authenticated`
      });
     
    }
  }


  login():void{
    console.log(this.usuario);
    

    this.authService.login(this.usuario).subscribe(respuesta=>{
      console.log("respuesta: " + JSON.stringify(respuesta));
     
      
      this.authService.guardarUsuario(respuesta.access_token);
      console.log("guardo Usuario");
      this.authService.guardarToken(respuesta.access_token);
      console.log("guardo Token");
      let usuario = this.authService.usuario;
      console.log("usuario autorizado: " + usuario.codigo);
      this.router.navigate(['/solicitudes']);
     
    },e=>{
      console.log("error: "+ JSON.stringify(e));
      if(e.status==400){

        swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: 'Credentials are incorrects'
        });

      }else if(e.status==401){

        swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: 'User does not exist in the system'
        });

      }

    }
    
    
    );;
    
  }

}
