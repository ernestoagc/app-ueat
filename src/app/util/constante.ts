import { environment } from 'src/environments/environment';

export class AppConstantes {    
    
    public static get solicitudApiUrl(): string { return environment.servicioURL+"/api/home/"; }
    public static get autenticacionApiUrl(): string { return environment.servicioURL; }
    
    
}