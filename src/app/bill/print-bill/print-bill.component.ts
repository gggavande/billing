import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { HelperFunctionService } from '../../common/helper-function.service';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.css']
})
export class PrintBillComponent implements OnInit {
  billId : any;
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

  constructor(private http : HttpClient, private router: Router, private route: ActivatedRoute,private helpers : HelperFunctionService) {
    this.route.paramMap.subscribe(params => {
      this.billId = atob(params.get('billId'));
    });

    this.http.post('http://localhost/testslim_1/public/fetchBill',{'billId':this.billId}).subscribe((response:any) => {
      // console.log(response);
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

        this.billDetails = response.data;
        this.amountInWords = this.helpers.numToWord(response.data.amount);
      }else{
        alert("Something Went Wrong!");
      }
      console.log(this.billDetails);

    });
   }

  ngOnInit(): void {

  }

  printPage() {
    window.print();
  }

}
