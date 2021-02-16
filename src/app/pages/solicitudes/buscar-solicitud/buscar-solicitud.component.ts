import { Component, OnInit , Output,Input, EventEmitter} from '@angular/core';
import { Candidato, Recomendacion } from 'src/app/modelo/modelo.index';
import {SolicitudService} from "../../../services/services.index"

@Component({
  selector: 'app-buscar-solicitud',
  templateUrl: './buscar-solicitud.component.html',
  styleUrls: ['./buscar-solicitud.component.css']
})
export class BuscarSolicitudComponent implements OnInit {

  @Output() solicitudesResultante: EventEmitter<any> = new EventEmitter();

//  @Output() solicitudesResultante: EventEmitter<any> = new EventEmitter();


  @Input()pagina:number; 

  solicitudes:any;
  puestoBuscar:any="";
  
  constructor(private solicitudService:SolicitudService) { }
  keyword = 'name';
  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes():void{


      this.pagina=0;
      console.log("puestoBuscarBuscar: "+this.puestoBuscar);
    console.log("pagina: " + this.pagina.toString());
    console.log("pagina: " + this.pagina.toString());


    let keywordBusqueda:string="";

    if(typeof(this.puestoBuscar) != 'string' ){
      console.log("no es string");
      keywordBusqueda=this.puestoBuscar.name;
    }else{
      console.log("SI ES string");
      keywordBusqueda=this.puestoBuscar;
    }

    this.solicitudService.buscar(this.pagina,keywordBusqueda,"").subscribe(
      respuesta =>{
        this.solicitudes=respuesta.content;
        respuesta.keyword=keywordBusqueda;
        this.solicitudesResultante.emit(respuesta);
        console.log("listandoRecomendaciones: "+ JSON.stringify( this.solicitudes));
      }
    );
  }

  buscar():void{

    

    console.log("busqueda puestoBuscar: "+ this.puestoBuscar);
    console.log("busqueda keyword: "+ this.keyword);



    

   this.cargarSolicitudes();
  }

  public countries = [
    {
      id: 1,
      name: 'Full stack java developer',
    },
    {
      id: 2,
      name: 'java developer',
    },
    {
      id: 3,
      name: 'web developer',
    } 
  ];

  
  selectEvent(item:any) { 
    console.log("itemSeleccionado: "+JSON.stringify( item.name));

  }

  onChangeSearch(search: string) { 
  }

  onFocused(e) { 
  }

}
