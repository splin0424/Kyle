import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit, OnChanges {
  @Input() inDataTable: any;
  @Input() inDaysPeriod: string[];
  @Output() outTableFinished = new EventEmitter();
  private _tableChange: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this._tableChange = true;
  }

  ngForCallback(){
    if(this._tableChange){
      // console.log('ngForCallback');
      this.outTableFinished.emit();
      this._tableChange = false;
    }
  }

}
