import {Headers, Http,  RequestOptions} from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css']
})
export class TestcompComponent implements OnInit {
  @Input() inDataTable: any;
  @Input() inDaysPeriod: string[];
  constructor(private _http: Http) { }

  ngOnInit() {
  }

  save(){
    let options = new RequestOptions();
    let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Accept': 'q=0.8;application/json;q=0.9' });
    options.headers = headers;
    let body = {
      'fab': 'Fab01',
      'shop': 'Shop01',
      'date': '2017/05/26',
      'qty': 100
    }

    let url = '/api/values/';
    this._http.post(url,body, options)
      .subscribe(next => console.log('ok'));
  }
}
