import { Component, OnInit, Output, EventEmitter,ElementRef,ViewChild } from '@angular/core';
import { Recomendacion, Valor } from 'src/app/modelo/modelo.index';
import { ActivatedRoute,Router } from '@angular/router';
import {Comun} from '../../util/comun';
import {SolicitudService,ModalService} from "../../services/services.index"
import swal from 'sweetalert2'

declare var $:any;
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  recomendacion:Recomendacion;
  operacionExitosa:boolean;

  @Output() guardoCambio: EventEmitter <boolean> = new EventEmitter();


  constructor(private solicitudService:SolicitudService,
    private activatedRoute:ActivatedRoute, private router:Router,
    private modalService:ModalService) {
      this.operacionExitosa=false;
      this.recomendacion=new Recomendacion();
      
      console.log("recomendacionConstructor: " + JSON.stringify( this.recomendacion));
     }

  ngOnInit(): void {
    console.log("recomendacionInit");
    this.operacionExitosa=false;
    this.modalService.modalAbiertoSolicitud.subscribe(id=>{
      this.cargarSolicitud(id);
    });
    

  }

  
  estiloEstado(estadoSolicitud:string):string{
    return Comun.estiloEstado(estadoSolicitud);
   }

  cargarSolicitud(id:number):void{
    if(id==0){
      //nuevo
      this.recomendacion=new Recomendacion();

      let estadoNuevo= new Valor();
      estadoNuevo.codigo="PENDIENTE";

      
    }else{      
      //llamar a la solicitud creada
      this.solicitudService.obtener(id).subscribe(respuesta =>{
        this.recomendacion=respuesta;
        }      
      );

    }
    
  }

  nuevaSolicitud(){

    console.log("recomendacion: " + JSON.stringify( this.recomendacion));
  
    let idCreacion:number=0;

  this.solicitudService.crear(this.recomendacion).subscribe(
    (respuesta)=>{      
      
      swal.fire({
        icon: 'success',
        title: 'Operación exitosa',
        text: 'Se creo la solicitud'
      });
    
     //this.guardoCambio.emit(true);
     this.modalService.cerrarModal("SOLICITUD");
     this.router.navigate(['/solicitudes']);

     //idCreacion=respuesta.id;
     this.operacionExitosa=true;
     //$('#ModalSolicitud').modal('hide');
     

    //this.recomendacion=new Recomendacion();
    this.recomendacion=respuesta;
    console.log(this.recomendacion);
    
     
     
    
    },
    error=>{


    },
    ()=>{
      this.closeBtn.nativeElement.click();
    }

  );

  }

}
