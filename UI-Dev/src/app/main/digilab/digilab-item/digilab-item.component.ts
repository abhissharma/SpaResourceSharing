import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Digilab } from '../../../model/digilab.model';

@Component({
  selector: 'app-digilab-item',
  templateUrl: './digilab-item.component.html',
  styleUrls: ['./digilab-item.component.css'] ,
})
export class DigilabItemComponent implements OnInit {

  @Input() 
  digilab : Digilab;

  @Input()
  index : number

  constructor() { }

  ngOnInit() {
  }

}
