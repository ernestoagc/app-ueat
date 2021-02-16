export class Comun {
 
    public static  estiloEstado(estadoSolicitud:string):string{
       // console.log("estadoSolicitud: "+estadoSolicitud);
        let claseEstado:string="";
        if(estadoSolicitud==="REALIZADO"){
            claseEstado="badge badge-pill badge-success";
     
        }else{
            claseEstado="badge badge-pill badge-warning";
        }
        return claseEstado;
      }



}