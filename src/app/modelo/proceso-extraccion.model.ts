import { Valor } from "./valor.model";
import { Recomendacion } from "./recomendacion.model";
export { HistorialProcesoExtraccion } from "./historial-proceso-extraccion.model";

export class ProcesoExtraccion{
    id:number;
    recomendacion:Recomendacion;
    etapa: Valor;
    estado: Valor;
    porcentajeAvance:number;
    historiales: any[];
}
    