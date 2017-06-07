import { NgForm } from '@angular/forms';
import { QueryParameters } from "app/shared/QueryParameters";
import { DataService } from './data.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as moment from 'moment';
import { Observable } from "rxjs/Rx";
import { MdProgressBar } from "@angular/material/material";

declare var $ : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Target Life';
  public hasBeenQuery: boolean = false;
  public pageOnGoing: boolean = false;
  // queryParameters: any = {plant: '', shop: '', date: ''};
  public  defaultQueryParams: QueryParameters = new QueryParameters;
  private _finalQueryParams: QueryParameters = new QueryParameters;

  public dataTable: any;
  public daysPeriod: any[] = [];

  @ViewChild('pbar') pbar: ElementRef;

  constructor(
    private _dataService: DataService,
    private _zone: NgZone
  ){}

  doSubmit(f: NgForm){

  }

  doQuery(f: NgForm){
    // console.log(new Date().getTime());
    this.hasBeenQuery = true;
    // this.dataTable = null;
    if(f.invalid){
      this.dataTable = null;
      return null;
    }
    this.pageOnGoing = true;

    Object.assign(this._finalQueryParams, f.value);
    // console.log(this._finalQueryParams)

    this._dataService.getTFTable(this._finalQueryParams).subscribe(
      (response) => setTimeout(()=> {
                                      this.dataTable = response.json();
                                      // console.log(this.dataTable);
                                    }, 0)
    );
    this._dataService.getDaysPeriod(this._finalQueryParams.date).subscribe(
      (response) => setTimeout(()=> {
                                      this.daysPeriod = response.json();
                                    }, 0)
    );
    // console.log(new Date().getTime());
  }
  doReset(f: NgForm) {
    this.hasBeenQuery = false;
    this.dataTable = null;
    f.reset(this.defaultQueryParams);
  }

  ngOnInit(){
    var mDate = moment();
    var today = mDate.format("YYYY/MM/DD");
    var day13 = mDate.add(13,'days').format("YYYY/MM/DD");
    this._finalQueryParams.date = today + ' - ' + day13;
    // this._finalQueryParams.date = '2017/04/11 - 2017/04/15';
  }

  onDateRangePickerChanged($event){
    this._finalQueryParams.date = $event;
  }

  onTableFinished(){
    /*  Occur Error below
    "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    Previous value: 'false'. Current value: 'true'."
    **so we cann't put 'this.pageOnGoing = false' directly, instead of click button to trigger.
    */
    //this.pageOnGoing = false;

    setTimeout(function () {
                $('#btnPBarStop').click();
            }, 100);
  }
  btnPBarStop(){
    this.pageOnGoing = false;
  }
}
