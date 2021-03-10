import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';


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
  // searchForm: any;
  customerList : any;
  data: any;
  keyword = 'name';
  dtOptions: any = {};
  isLoading : boolean = true;
  // dtTrigger : any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http : HttpClient , private router : Router, private route : ActivatedRoute,private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.dtOptions = {

      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'print',
        'excel',
      ],
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.fetchCustomers(1);


    /* this.searchForm = this.fb.group({
      custName: ['',Validators.required],
    }); */
  }

  fetchCustomers(page: number) {
    // page = 1;
    this.http.post('http://localhost/testslim_1/public/fetchCustomers',{q : page}).subscribe((response:any) => {
      this.isLoading= false;
      // console.log(response);
      if(response.status == true){
        this.tableData = response.data;
      }
      this.dtTrigger.next();
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
}
