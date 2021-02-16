import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import{Recomendacion} from '../../modelo/modelo.index'
import { ActivatedRoute,Router } from '@angular/router';
import {Comun} from '../../util/comun';
import { timeout, catchError } from 'rxjs/operators';
import {SolicitudService, ModalService, ObjectTransferService} from "../../services/services.index"
import{NoCommaPipe} from '../../pipe/no-comma.pipe'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $:any;



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  
  paginaBuscador=0;
  paginaFinal:number;
  showDropDown = false;

  totalSolicitudes:number=0;

  
 notEmptyPost = true;
 notscrolly = true;



  recomendaciones:Recomendacion[];
  puestoBuscador:string="";
  constructor(private solicitudService:SolicitudService,
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private objectTransferService:ObjectTransferService,
    private spinner: NgxSpinnerService,
    private modalService:ModalService) {
     // this.initForm();
   }



  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params =>{

      

      let codigoPagina = params['page'];

      if (!codigoPagina){
        this.paginaBuscador=0;
      }
      
   //   this.cargarListado(pagina);
      
    });

    this.modalService.modalCerrado.subscribe(modal => {
      if(modal=="SOLICITUD"){
        this.cargarListado(0);
      //  $('#ModalSolicitud').modal('hide');
      }
    });
    
   

  }

  obtenerSolicitudesResultante(solicitudes:any){
    console.log("llega el emit");
     this.recomendaciones=solicitudes.content;
     this.notEmptyPost=true;
     this.notscrolly=true;
     this.paginaBuscador=0;
this.puestoBuscador=solicitudes.keyword;
     this.paginaFinal= solicitudes.totalPages;
     this.totalSolicitudes=solicitudes.totalElements;
  }

  estiloEstado(estadoSolicitud:string):string{
   return Comun.estiloEstado(estadoSolicitud);
  }

  cargarListado(pagina: number){


    if (!pagina){
      pagina=0;
    }

    console.log("pagina: " + pagina.toString());
    

    this.solicitudService.buscar(pagina,this.puestoBuscador,"").subscribe(
      respuesta =>{
        this.recomendaciones=respuesta.content;
        console.log("listandoRecomendaciones: "+ JSON.stringify( this.recomendaciones));
      }
    );
  }

  abrirModal(id:number){

    console.log("solicitud: "+id);
    if (!id){
      id=0;
    }
    
    //this.modalService.abrirModal("SOLICITUD");
    console.log("por abrir ");
    this.modalService.abrirModalSolicitud(id);
    //this.router.navigate(['/solicitud',id]);


  }
   


  onScroll():void{


    try {

      
    if (this.notscrolly && this.notEmptyPost) {
     
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
     }

    }catch(e){
      console.log("error deslizar");
      this.spinner.hide();
    }

  }


  loadNextPost():void{

    
   
     
    console.log("scroolbar");

    
    console.log("paginaFinal:  " + this.paginaFinal);
    console.log("paginaBuscador:   " + this.paginaBuscador);

    if(this.paginaBuscador<this.paginaFinal){
      this.paginaBuscador=this.paginaBuscador+1;
    }
    


    this.solicitudService.buscar(this.paginaBuscador,this.puestoBuscador,"").subscribe(
      (respuestaSolicitudes) =>{
     
      timeout(3000);
     
      const nuevasSolicitudes = respuestaSolicitudes.content;
      this.spinner.hide();
      
        if (nuevasSolicitudes.length === 0 ) {
          this.notEmptyPost =  false;
        }

        this.recomendaciones = this.recomendaciones.concat(nuevasSolicitudes);
        this.notscrolly = true;
    },    
    error=>{
      this.spinner.hide();
    },
    ()=>{}
    );

  }
 

}
