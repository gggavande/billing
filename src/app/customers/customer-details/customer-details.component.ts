import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerId : any;
  customerData : any;
  isLoading : boolean = true;


  constructor(private route : ActivatedRoute, private http : HttpClient , private router : Router) {
    this.route.paramMap.subscribe(params => {
      this.customerId = atob(params.get('customerId'));
      console.log(this.customerId);
    });
   }

  ngOnInit(): void {
    this.fetchCustomerDetails(1);

  }

  fetchCustomerDetails(page : number){
    this.http.post('http://localhost/testslim_1/public/fetchCustomerDetails',{q : page,customerId : this.customerId}).subscribe((response:any) => {
      console.log(response);
      this.isLoading = false;
      if(response.status == true){
        this.customerData = response.data;
      }
      // console.log(this.tableData);
    });
  }

  viewBill(billId : any){
    console.log(billId);
    this.router.navigate(['view-bill/'+btoa(billId)]);
  }

  editBill(billId : any){
    console.log(billId);
    this.router.navigate(['edit-bill/'+btoa(billId)]);
  }


}
