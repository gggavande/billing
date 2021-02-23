import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

export interface CustomerInt {
  customerId: number;
  name: string;
  mobile: number;
  email: string;
  address: string;
  status: number;
}

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css']
})
export class CustomerListingComponent implements OnInit {

  tableData : CustomerInt;
  searchForm: any;
  customerList : any;
  data: any;
  keyword = 'name';
  dtOptions: DataTables.Settings = {};
  dtTrigger : any;


  constructor(private http : HttpClient , private router : Router, private route : ActivatedRoute,private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.fetchCustomers(1);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.searchForm = this.fb.group({
      custName: ['',Validators.required],
    });
  }

  fetchCustomers(page: number) {
    // page = 1;
    this.http.post('http://localhost/testslim_1/public/fetchCustomers',{q : page}).subscribe((response:any) => {
      // console.log(response);
      if(response.status == true){
        this.tableData = response.data;
      }
      // console.log(this.tableData);
    });
  }

  goToDetail(customerId : any){
    this.router.navigate(['customer-detail/'+btoa(customerId)]);
    // console.log(customerId);
  }

  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }

  selectEvent(item) {
    console.log(item);
    this.http.post('http://localhost/testslim_1/public/fetchCustomersSearch',{q : item}).subscribe((response:any) => {
      // console.log(response);
      if(response.status == true){
        this.tableData = response.data;
      }
      // console.log(this.tableData);
    });
    // do something with selected item
  }

  onChangeSearch(val: string) {
    this.http.post('http://localhost/testslim_1/public/getCustomerList',{q : val}).subscribe((response:any) => {
      console.log(response.data);
      if(response.status == true){
        this.data = response.data;
      }else{
        this.data = [];
      }
    });
  }

  onFocused(e){
    // do something when input is focused
  }
}
