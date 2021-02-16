import { Valor } from "./valor.model";
import { Recomendacion } from "./recomendacion.model";

export class Candidato{
    id:number;
    recomendacion:Recomendacion;
    evaluacion:number;
    linkedinEnlace:string;
    nombreCompleto:string;
    perfil:string;
    linkedinTrama:any;
    tieneEstudio:boolean;
    tieneCertificacion:boolean;
    tieneExperienciaLaboral:boolean;
    tieneAptitud:boolean;
    linkedinObjeto:any= (this.linkedinTrama == null? {} :  (JSON.parse(this.linkedinTrama)));

    public Candidato(){
        this.id=0;
        this.linkedinTrama=null;
       this.linkedinObjeto={};
    }
}
    