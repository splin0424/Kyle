import { DataService } from 'app/data.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/startWith';
import { ValidatePNExist } from "app/shared/pn-validator";
import { ValidateExist } from "app/shared/in-list-validator";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit, OnChanges, DoCheck {
  dataTable: any;
  @Input() inName: string;
  @Input() inOptions: any;
  @Input() inCurrentOption: string;

  stateCtrl: FormControl;
  filteredOptions: any;
  @Output() outSelectedOption = new EventEmitter();
  @Output() outInvalid = new EventEmitter();
  form: FormGroup;

  constructor(
    private _dataService: DataService,
    private _fb: FormBuilder
  ) {
    this.stateCtrl = new FormControl()
  }
  inputList: string[]=[];
  ngOnInit(){
  }

  ngOnChanges(){
    if (this.inOptions!=null) {
      this.inputList=this.inOptions.map(item=>item.PN);
    }
    this.form = this._fb.group({
      'fpn': [
          this.inCurrentOption, [
            Validators.required,
            ValidatePNExist(this.inputList)
        ],
      ]
    });

    this.filteredOptions = this.stateCtrl.valueChanges
                            // .startWith(null)
                            // .startWith(this.stateCtrl.value)
                            .startWith(this.inCurrentOption)
                            .map(val => this.displayFn(val))
                            .map(name => this.filterOptions(name));
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.PN : value;
  }
  filterOptions(val: string) {
    if (this.inOptions==null) {
      return null;
    }
    return val ? this.inOptions.filter(s => new RegExp(`^${val}`, 'gi').test(s.PN))
               : this.inOptions;
  }

  ngDoCheck(){
    this.outInvalid.emit({
      Invalid: this.form.controls.fpn.invalid,
      pn: this.inCurrentOption
    });
  }

  onValueChange($event){
    if(($event!=null)&&(typeof $event==='object')){
      this.outSelectedOption.emit($event);
    }
  }

}
