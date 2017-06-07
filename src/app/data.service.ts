import {Injectable} from '@angular/core';
import {URLSearchParams, Headers,  Http,  RequestOptions} from '@angular/http';

@Injectable()
export class DataService {
  // private _queryParameters: any;
  // set todos(value) {
  //   this._todos = value;
  //   this.updateTodos();
  // }
  // get todos() {
  //   return this._todos;
  // }
  headers: Headers;
  options: RequestOptions;

  postmanOptions: RequestOptions = new RequestOptions({
    headers: new Headers(
          {'Authorization': 'token 918ba598-d1e6-4810-9a2b-d9c502d5867c',
          'Content-Type':'application/json'}
        )
  });

  constructor(private _http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
                                     'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  APIName: string = "";   // Dev
  //APIName: string = "/TargetLifeAPI";   // Prod

  getTFTable(queryParameters) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('plant', queryParameters.plant);
    params.set('shop', queryParameters.shop);
    params.set('equipment', queryParameters.equipment);
    params.set('cathode', queryParameters.cathode);
    params.set('category', queryParameters.category);
    params.set('materialtype', queryParameters.materialtype);
    params.set('shift_date', queryParameters.shift_date);
    params.set('vendor', queryParameters.vendor);
    params.set('bp_mask_no', queryParameters.bp_mask_no);
    params.set('pn', queryParameters.pn);
    params.set('date', queryParameters.date);
    this.options.search = params;
    //let url = '/api/QueryTargetLifeTable/';
    let url = this.APIName + '/api/QueryTargetLifeTable/';
    return this._http.get(url, this.options)
  }
  getDaysPeriod(datePeriod){
    let params: URLSearchParams = new URLSearchParams();
    params.set('date', datePeriod);
    this.options.search = params;
    //let url = '/api/DaysPeriod/';
    let url = this.APIName + '/api/DaysPeriod/';
    return this._http.get(url, this.options)
  }
  getTFDetail(queryParameters){
    let params: URLSearchParams = new URLSearchParams();
    params.set('plant', queryParameters.plant);
    params.set('shop', queryParameters.shop);
    params.set('equipment', queryParameters.equipment);
    params.set('cathode', queryParameters.cathode);
    params.set('category', queryParameters.category);
    params.set('materialtype', queryParameters.materialtype);
    params.set('shift_date', queryParameters.shift_date);
    this.options.search = params;
    //let url = '/api/MCTargetLife/';
    let url = this.APIName + '/api/MCTargetLife/';
    return this._http.get(url, this.options)
  }
  getTFPNVendor(){
    //let url = '/api/MCTargetLifeVendorMapping/';
    let url = this.APIName + '/api/MCTargetLifeVendorMapping/';
    return this._http.get(url, this.options)
  }
  storeTF(body){
    //let url = '/api/MCTargetLife/';
    let url = this.APIName + '/api/MCTargetLife/';
    return this._http.post(url,body, this.options);
  }

  updateTodos(par) {
    this._http.post('./me/demo0419', par, this.postmanOptions)
        .subscribe(rsp => console.log('更新完成！ ', rsp.json()));
  }
}
