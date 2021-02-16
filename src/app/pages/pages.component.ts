import { Component, OnInit, ɵConsole } from '@angular/core';
import { ModalService} from '../services/services.index';
declare var $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private modalService:ModalService) {
   }

  ngOnInit(): void {
  }

  /*
  onActivate(event) {
    console.log("route event onActivate");
   // window.scroll(0,0);
   //  document.body.scrollTop = 0;
     document.querySelector('body').scrollTo(0,0)
  }*/

}
