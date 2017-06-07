import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
  @Output() outPeriod = new EventEmitter();
  constructor() { }

  ngOnInit() {
    var mDate = moment();
    var today = mDate.format("YYYY/MM/DD");
    // var day7 = mDate.add(7,'days').format("YYYY/MM/DD");
    var day13 = mDate.add(13,'days').format("YYYY/MM/DD");
    var day30 = mDate.add(17,'days').format("YYYY/MM/DD");

    $('input[name="daterange"]').daterangepicker({
        locale: {
            format: 'YYYY/MM/DD'
        },
        ranges: {
            "Last 13 Days": [
                today,
                day13
            ],
            "Last 30 Days": [
                today,
                day30
            ]
        },
        startDate: today,
        endDate: day13
    }, function(start, end, label) {
      console.log(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
      setTimeout(function () {
                $('#btnHide').click();
            }, 100);
    });
  }

  btnHideClick(){
    this.outPeriod.emit($('input[name="daterange"]')[0].value);
  }

}
