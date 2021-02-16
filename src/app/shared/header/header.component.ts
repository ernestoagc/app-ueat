import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/services.index';
import{Usuario} from '../../modelo/modelo.index'
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  usuario:Usuario;
  ngOnInit(): void {
    this.usuario=this.authService.usuario;
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
