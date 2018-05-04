import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DigilabService } from '../../../services/digilab.service';
import { Subscription } from 'rxjs';
import { Digilab } from '../../../model/digilab.model';

@Component({
  selector: 'app-digilab-list',
  templateUrl: './digilab-list.component.html',
  styleUrls: ['./digilab-list.component.css'] ,
  encapsulation : ViewEncapsulation.None
})
export class DigilabListComponent implements OnInit , OnDestroy {

  subscription : Subscription;

  digilabs : Digilab[];

  constructor( private digilabService : DigilabService ) { }

  ngOnInit() {
    this.subscription = this.digilabService.digilabChanged.subscribe( ( digilabs : Digilab[] ) => {
      this.digilabs = digilabs;
    }  );
    this.digilabs = this.digilabService.getDigilabs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
