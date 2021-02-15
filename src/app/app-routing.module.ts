import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import { GenerateBillComponent } from './bill/generate-bill/generate-bill.component';
import { AccountingComponent } from './accounting/accounting.component';
import { CustomerListingComponent } from './customers/customer-listing/customer-listing.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ViewBillComponent } from './bill/view-bill/view-bill.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';


const routes: Routes = [
  { path: '', component: GenerateBillComponent },
  { path: 'print-bill/:billId', component: PrintBillComponent },
  { path: 'accounting', component: AccountingComponent },
  { path: 'customers', component: CustomerListingComponent },
  { path: 'customer-detail/:customerId', component: CustomerDetailsComponent },
  { path: 'view-bill/:billId', component: ViewBillComponent },
  { path: 'edit-bill/:billId', component: EditBillComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
