import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private cerrandoModal = new BehaviorSubject<string>("");
  private abriendoModal = new BehaviorSubject<string>("");
  private abriendoModalSolicitud = new BehaviorSubject<number>(0);
  private obteniendoCandidato = new BehaviorSubject<any>(null);

  modalCerrado = this.cerrandoModal.asObservable();
  modalAbierto = this.abriendoModal.asObservable();
  modalAbiertoSolicitud = this.abriendoModalSolicitud.asObservable();

  constructor() { }

  abrirModal(modal:string){
    this.abriendoModal.next(modal);
  }

  abrirModalSolicitud(id:number){
    this.abriendoModalSolicitud.next(id);
  }

  cerrarModal(modal:string){
    this.cerrandoModal.next(modal);
  }

  obtenerCandidato (candidato:any){
    this.obteniendoCandidato.next(candidato);
  }
}
