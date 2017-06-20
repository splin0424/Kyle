import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as moment from 'moment';
import { DataService } from "app/data.service";
import { QueryParameters } from "app/shared/QueryParameters";
import { DialogDetail } from "app/shared/DialogDetail";
import { NgForm } from "@angular/forms";
import { DialogResultDialog } from "app/modify-dialog/dialog-result-dialog";

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {
  @Input() inDisplayIndex: string;
  private _pn: string;
  private _materialType: string;
  private _vendor: string;
  private _category: string;
  private _bp_mask_no: string;
  private _qty: string;
  private _remark: string;

  private _ppn: string;
  private _pmaterialType: string;
  private _pvendor: string;
  private _pcategory: string;
  private _pbp_mask_no: string;
  private _pqty: string;
  private _premark: string;

  private _thisRow: any;
  public displayQty: string;
  public tooMany: boolean = false;
  public tooSmall: boolean = false;
  public Tooltip: string;
  @Input() inDay: string;
  @Input()
    set inRows(thisRow)
    {
      this._thisRow = thisRow;
      var mDate = moment(this.inDay,"YYYY/MM/DD");
      var thisDay = mDate.format("YYYY/MM/DD");
      var previewDay = mDate.add(-1,'days').format("YYYY/MM/DD");

      // today value
      // raw data: 1000,R2382011NTZ0,榮眾,Target,1000,1,Al
      var todayValue = thisRow[thisDay];
      if(todayValue != null){
        var todayArr = todayValue.split(",");
        this._qty = todayArr[0];
        this._pn = todayArr[1];
        this._vendor = todayArr[2];
        this._category = todayArr[3];
        this._bp_mask_no = todayArr[4];
        this._remark = todayArr[5];
        this._materialType = todayArr[6];
      }
      // previewDay value
      var predayValue = thisRow[previewDay];
      if(predayValue != null){
        var predayArr = predayValue.split(",");
        this._pqty = predayArr[0];
        this._ppn = predayArr[1];
        this._pvendor = predayArr[2];
        this._pcategory = predayArr[3];
        this._pbp_mask_no = predayArr[4];
        this._premark = predayArr[5];
        this._pmaterialType = predayArr[6];
      }

      this.displayQty = this._qty ? this._qty : '-';
      // this.displayQty = thisRow[thisDay];
      // if (+this.inDisplayIndex == 0){ // ignore first value
      //   this.tooMany = false;
      // }
      // else{
      if((this._pn == this._ppn)&&(this._vendor == this._pvendor)
          &&(this._bp_mask_no == this._pbp_mask_no)){
        this.tooMany = ((+this._qty) - (+this._pqty)) > 400 ? true : false;
        this.tooSmall = (+this._qty) < (+this._pqty) ? true : false;
      }else{
        this.tooMany = (+this._qty) > 400 ? true : false;
      }

      // console.log(this._pn + ';' +  this._qty +'<'+ this._pqty +  ':' + this.tooSmall);

      // }

      if(this._pn){
        this.Tooltip = "料號：" + this._pn + "\n"
                    + " Material Type：" + this._materialType + "\n"
                    + " 供應商：" + this._vendor + "\n"
                    + " 類別：" + this._category + "\n"
                    + " BP/Mask No.：" + this._bp_mask_no + "\n"
                    + " 備註：" + this._remark;
      }
    }
    get inRows(){
      return this._thisRow;
    }

  constructor(
    public dialog: MdDialog
  ) {}
  detail: DialogDetail = new DialogDetail;
  queryParameters: QueryParameters = new QueryParameters;

  openDialog() {
    let dialogRef = this.dialog.open(DialogResultDialog, {
        height: '450px',
        width: '380px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(typeof result === 'object'){
        this.displayQty = result.qty ? result.qty : '-';
        this.tooMany = ((+result.qty) - (+result.pre_qty)) > 400 ? true : false;
        this.Tooltip = "料號：" + result.pn + "\n"
                    + " 供應商：" + result.vendor + "\n"
                    + " 類別：" + result.category + "\n"
                    + " BP/Mask No.：" + result.bp_mask_no + "\n"
                    + " 備註：" + result.remark;
        this._pn = result.pn;
        this._vendor = result.vendor;
        this._bp_mask_no = result.bp_mask_no;
        this._qty = result.qty;
        this._pqty = result.pre_qty;
        this._remark = result.remark;

        //trigger btnQuery button
        $("#btnQuery").click();
      }
    });

    this.detail.category = this.inRows.CATEGORY;
    if(this._pn != null){
      this.detail.pn = this._pn;
      this.detail.materialType = this._materialType;
      this.detail.vendor = this._vendor;
      // this.detail.category = this._category;
      this.detail.bp_mask_no = this._bp_mask_no;
      this.detail.qty = +this._qty;
      this.detail.remark = this._remark;
      this.detail.pre_pn = this._ppn;
      this.detail.pre_vendor = this._pvendor;
      this.detail.pre_bp_mask_no = this._pbp_mask_no;
      this.detail.pre_qty = +this._pqty;
    }else{
      if(this._ppn != null){
        this.detail.pn = this._ppn;
        this.detail.materialType = this._pmaterialType;
        this.detail.vendor = this._pvendor;
        // this.detail.category = this._pcategory;
        this.detail.bp_mask_no = this._pbp_mask_no;
        this.detail.pre_qty = +this._pqty;
        this.detail.pre_pn = this._ppn;
        this.detail.pre_vendor = this._pvendor;
        this.detail.pre_bp_mask_no = this._pbp_mask_no;
      }
    }
    dialogRef.componentInstance.inDetail = this.detail;

    /* GET MC_TargetLife ROW DATA for store use */
    this.queryParameters.plant = this.inRows.PLANT;
    this.queryParameters.shop = this.inRows.SHOP;
    this.queryParameters.equipment = this.inRows.EQUIPMENT;
    this.queryParameters.cathode = this.inRows.CATHODE;
    this.queryParameters.category = this.inRows.CATEGORY;
    this.queryParameters.materialtype = this.inRows.MATERIALTYPE;
    this.queryParameters.shift_date = this.inDay;
    dialogRef.componentInstance.inQueryParameters = this.queryParameters;
    //console.log(this.queryParameters);
  }

  ngOnInit() {

  }

}



