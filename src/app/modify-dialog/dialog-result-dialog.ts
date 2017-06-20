import { DialogDetail } from 'app/shared/DialogDetail';
import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as moment from 'moment';
import { DataService } from "app/data.service";
import { QueryParameters } from "app/shared/QueryParameters";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateQty } from "app/shared/qty-validator";

@Component({
  selector: 'dialog-result-dialog',
  templateUrl: './dialog-result-dialog.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class DialogResultDialog implements OnInit{
  constructor(
    public dialogRef: MdDialogRef<DialogResultDialog>,
    private _dataService: DataService,
    private _fb: FormBuilder
              ) {
  }
  form: FormGroup;
  res: any;
  dataTable: any;
  options: string[];
  fvendor_error: string;

  msg: string;
  @Input()
    set inDetail(value: DialogDetail){
      this.detail = value;
    }
  detail: DialogDetail = new DialogDetail;
  pnInvalid: boolean;
  private _queryParameters: QueryParameters = new QueryParameters;
  @Input()
    set inQueryParameters(value: QueryParameters){
      this._queryParameters = value;
    }
    get inQueryParameters(){
      return this._queryParameters;
    }

  ngOnInit(){
    this._dataService.getTFPNVendor().subscribe(
      (response) => setTimeout(()=> {
                                      this.dataTable = response.json();
                                      // this.options = this.dataTable.map((obj) => obj.PN+":"+obj.VENDOR);
                                    }, 1000)
    );
    this.form = this._fb.group({
      'fpn_hide': [],
      'fmaterialType': [],
      'fvendor': [],
      'fcategory':[],
      'fbp_mask_no':[],
      'fqty':[,[
        Validators.required,
        ValidateQty
      ]],
      'fremark':[],
      'fpre_pn_hide':[],
      'fpre_vendor_hide':[],
      'fpre_qty':[]
    });
  }

  checkVendor($event){
    // console.log(this.dataTable);
    // console.log(this.inDetail);
    // if (this.dataTable==null) {
    //   return;
    // }
    // this.inDetail.vendor = this.dataTable
    //                   .filter((obj) => obj.PN==$event)
    //                   .map((obj) => obj.VENDOR);

    //this.form.controls.fvendor = $event.VENDOR;
    // console.log($event);
    if(($event!=null)&&(typeof $event==='object')){
      this.detail.pn = $event.PN;
      this.detail.vendor = $event.VENDOR;
      this.detail.materialType = $event.MATERIALTYPE;
    }
  }
  checkInvalid($event){
    //這段是為了避免使用者複製貼上PN，而沒有選取下拉式選單中的PN+Vendor
    //所以只要是PN檢查成功、型態為string，卻不等於現有的PN。認定為複製貼上的Case
    //(因為string並不會觸發checkVendor)
    if(($event.Invalid==false)&&(typeof $event.pn==='string')&&($event.pn!==this.detail.pn)){
      this.detail.vendor='';
      this.fvendor_error = "\"請選取料號以帶出供應商。\"";
    }
    this.pnInvalid=$event.Invalid;
  }


  save(){
    if(this.pnInvalid){
      return null;
    }
    if(!this.form.controls.fvendor.value){
      this.fvendor_error = "\"請選取料號以帶出供應商。\"";
      return null;
    }
    if(this.form.controls.fqty.invalid){
      if(!this.form.controls.fremark.value){
        return null;
      }
    }

    this.detail.bp_mask_no = this.form.controls.fbp_mask_no.value;
    this.detail.qty = this.form.controls.fqty.value;
    this.detail.remark = this.form.controls.fremark.value;
    // Object.assign(this.detail, this.inQueryParameters);
    // console.log(this.detail)
    // console.log(this.pnInvalid+','+this.detail.pn);

    if((!this.pnInvalid)&&(this.detail.pn!=null)){
      // console.log(this.inQueryParameters);
      // console.log(this.detail)
      this._dataService.storeTF(Object.assign(this.inQueryParameters, this.detail))
      .subscribe(
          next => { console.log(next); }
        );

      this.dialogRef.close(this.detail);
    }

  }

  cancel(){
    this.dialogRef.close();
  }
}

