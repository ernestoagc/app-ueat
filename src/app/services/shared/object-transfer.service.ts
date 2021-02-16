import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectTransferService {

  private obteniendoCandidato = new BehaviorSubject<any>(null);
  private registrandoCandidato = new BehaviorSubject<any>(null);

  observableObtenerCandidato = this.obteniendoCandidato.asObservable();

  observableRegistarCandidato = this.registrandoCandidato.asObservable();


  constructor() { }

  transferirCandidato (candidato:any){
    this.obteniendoCandidato.next(candidato);
  }

  nuevoCandidato (recomendacion:any){
    this.registrandoCandidato.next(recomendacion);
  }
}
