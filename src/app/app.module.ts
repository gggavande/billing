import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { GenerateBillComponent } from './bill/generate-bill/generate-bill.component';
import { ValidationService } from 'src/app/validation.service';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import {NgxPrintModule} from 'ngx-print';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AccountingComponent } from './accounting/accounting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListingComponent } from './customers/customer-listing/customer-listing.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ViewBillComponent } from './bill/view-bill/view-bill.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GenerateBillComponent,
    PrintBillComponent,
    AccountingComponent,
    CustomerListingComponent,
    CustomerDetailsComponent,
    ViewBillComponent,
    EditBillComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
