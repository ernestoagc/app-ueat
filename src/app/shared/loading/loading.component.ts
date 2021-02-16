import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from '../../services/services.index';
 
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit,OnDestroy   {
  loading = false;
  loadingSuscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {
    console.log("creacion suscripcion");
   }

   ngOnInit() {
    console.log("ngOnInit suscripcion");
    this.loadingSuscription = this.loadingScreenService.loadingStatus
      .subscribe((value: boolean) => {
        console.log("loading suscripcion");
        this.loading = value;

      });
    }

    ngOnDestroy() {
      this.loadingSuscription.unsubscribe();
    }

}
