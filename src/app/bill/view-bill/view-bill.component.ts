import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperFunctionService } from 'src/app/common/helper-function.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {
  billId : any;
  isLoading : boolean = true;

  billDetails : any;
  billNo : any;
  date : any;
  items : any;
  amount : any;
  gstStatus : any;
  gstAmount : any;
  customerName : any;
  customerEmail : any;
  customerMobile : any;
  amountInWords : string;
  customerGst : any;
  customerAdd : any;

  constructor( private http : HttpClient ,private route : ActivatedRoute , private helpers : HelperFunctionService) {
    this.route.paramMap.subscribe(params => {
      this.billId = atob(params.get('billId'));
    });
   }

  ngOnInit(): void {
    this.fetchBill();
  }

  fetchBill(){
    this.http.post('http://localhost/testslim_1/public/fetchBill',{billId : this.billId}).subscribe((response:any) => {
      console.log(response);
      this.isLoading = false;
      if(response.status == true){
        this.billNo = response.data.billNo;
        this.date = response.data.date;
        this.items = response.data.item;
        this.amount = response.data.amount;
        this.gstStatus = response.data.gstStatus;
        this.gstAmount = response.data.gstAmount;
        this.customerName = response.data.customer.name;
        this.customerEmail = response.data.customer.email;
        this.customerMobile = response.data.customer.mobile;
        this.customerGst = response.data.customer.gst_no;
        this.customerAdd = response.data.customer.address;

        

        this.billDetails = response.data;
        this.amountInWords = this.helpers.numToWord(response.data.amount);
      }else{
        alert("Something Went Wrong!");
      }
      /* if(response.status == true){
        this.billData = response.data;
        console.log(this.billData);
      } */
    });
  }

  printPage() {
    window.print();
  }

}
