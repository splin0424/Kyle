import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdAutocompleteModule } from '@angular/material';
import 'hammerjs';

import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { Ng2DatatableComponent } from './ng2-datatable/ng2-datatable.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';
import { DialogResultDialog } from './modify-dialog/dialog-result-dialog';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TestcompComponent } from './testcomp/testcomp.component';
import { MainTableComponent } from './main-table/main-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DateRangePickerComponent,
    Ng2DatatableComponent,
    DataFilterPipe,
    ModifyDialogComponent,
    DialogResultDialog,
    AutocompleteComponent,
    TestcompComponent,
    MainTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdAutocompleteModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogResultDialog
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
