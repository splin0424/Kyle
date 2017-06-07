import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-ng2-datatable',
  templateUrl: './ng2-datatable.component.html',
  styleUrls: ['./ng2-datatable.component.css']
})
export class Ng2DatatableComponent implements OnInit, OnChanges {
  @Input() inDataTable: any;
  @Input() inDaysPeriod: string[];

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "PLANT";
  public sortOrder = "asc";
  //public dataPeriod: string[] = ["20170410", "20170411","20170412"];


  ngOnInit() {

  }
  ngOnChanges(){
    //console.log(this.inDaysPeriod);
    //console.log(this.inDataTable);
  }

  onMaintain_Click($event){
    console.log("onMaintain_Click_"+ $event);
  }

}
