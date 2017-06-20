import {Headers, Http,  RequestOptions} from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-testcomp',
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.css']
})
export class TestcompComponent implements OnInit {
  constructor(private _http: Http) { }
  public plant: string;
  public aryShop: any;


  ngOnInit() {
    var $sele = $('#seleShop');
    Observable.fromEvent($sele, 'click').subscribe(
      next => {
        console.log(this.plant);
        if(this.plant == "T000"){
          this.aryShop = [
            {value: 'ARRAY', viewValue: 'ARRAY'},
          ];
        } else {
          this.aryShop = [
            {value: 'ARRAY', viewValue: 'ARRAY'},
            {value: 'CF', viewValue: 'CF'}
          ];
        }
      }
    );
  //  $(document).ready(function () {

	// 	    	$('#seleTest').change(function (event) {
	// 	            alert(event.id);
	// 	        });

  //   	});

    // var input = $('#seleTest');

    // var source = Observable.fromEventPattern(
    //   function add (h) {
    //     $('seleTest').on('change', h);
    //   },
    //   function remove (h) {
    //     input.unbind('change', h);
    //   }
    // );

    // var subscription = source.subscribe(
    //   function (x) {
    //     console.log('Next: Clicked!');
    //   },
    //   function (err) {
    //     console.log('Error: %s', err);
    //   },
    //   function () {
    //     console.log('Completed');
    //   });
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
