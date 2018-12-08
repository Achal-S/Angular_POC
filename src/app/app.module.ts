import { EmployeeService } from './service/employee.service';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FirstOptionComponent } from './first-option/first-option.component';
import { SecondOptionComponent } from './second-option/second-option.component';
import { ThirdOptionComponent } from './third-option/third-option.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { Ng2TableModule } from './components/ng-table-module';
import { RowContentComponent } from './second-option/row-content/row-content.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstOptionComponent,
    SecondOptionComponent,
    ThirdOptionComponent,
    RowContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2TableModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents: [RowContentComponent]


})
export class AppModule { }
