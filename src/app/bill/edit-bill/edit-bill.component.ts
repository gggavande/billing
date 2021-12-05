import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit {
  billId : any;
  billDetails : any;
  isLoading : boolean = true;
  billForm : any;
  item : any = [];
  itemNo : number = 0;
  newItemNo : number = 0;

  constructor(private http : HttpClient, private route : ActivatedRoute,private fb : FormBuilder ,private router : Router) {

    this.route.paramMap.subscribe(params => {
      this.billId = atob(params.get('billId'));
    });
  }

  ngOnInit(): void {
    // console.log("item Length is: "+this.item.length);
    this.billForm = this.fb.group({
      noOfItem: ['0'],
      gst: ['',Validators.required],
      isPaid: ['',Validators.required],
      amountReceived: ['0'],
      billId: ['0'],
      billNo: ['0'],
      custGst : [''],
      custCity : [''],
      custMob : [''],
      custEmail : ['']
    });
    this.fetchBill(this);
  }

  fetchBill(e){
    this.http.post('http://localhost/testslim_1/public/fetchBill',{billId : this.billId}).subscribe((response:any) => {
      // console.log(response);
      this.isLoading = false;
      if(response.status == true){
        this.billDetails = response.data;
        // console.log("item Length is: "+this.item.length);

        this.billForm.patchValue({gst: this.billDetails.gstStatus});
        this.billForm.patchValue({isPaid: this.billDetails.status});
        this.billForm.patchValue({amountReceived: this.billDetails.amountReceived});
        this.billForm.patchValue({billId: this.billDetails.billId});
        this.billForm.patchValue({billNo: this.billDetails.billNo});

        this.billForm.patchValue({custCity: this.billDetails.customer.address});
        this.billForm.patchValue({custGst: this.billDetails.customer.gst_no});
        this.billForm.patchValue({custMob: this.billDetails.customer.mobile});
        this.billForm.patchValue({custEmail: this.billDetails.customer.email});
        var i = 0;
        response.data.item.forEach(function (row) {
          // console.log(row);
          i++;
          e.billForm.addControl("itemId"+i,e.fb.control(row.itemId,Validators.required));
          e.billForm.addControl("item"+i,e.fb.control(row.name,Validators.required));
          e.billForm.addControl("item"+i+"Rate",e.fb.control(row.rate,Validators.required));
          e.billForm.addControl("item"+i+"Unit",e.fb.control(row.unit,Validators.required));
          e.billForm.addControl("item"+i+"Price",e.fb.control(row.amount,Validators.required));
          e.billForm.patchValue({noOfItem: i});
          // console.log(this.billForm);

        });
        this.itemNo = i;
        this.item = response.data.item;
        console.log(this.billDetails);
      }else{
        alert("Something Went Wrong!");
      }
    });
  }

  calcAmount(ind : any){
    let rate : any = this.billForm.get('item'+ind+'Rate').value;
    let unit : any = this.billForm.get('item'+ind+'Unit').value;
    if(rate && unit){
      let price = rate*unit;
      this.billForm.patchValue({['item'+ind+'Price']: price});
    }
  }

  addEle(){
    this.newItemNo++;
    this.itemNo++;
    // console.log(this.itemNo,this.newItemNo);
    this.billForm.addControl("item"+this.itemNo,this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Rate",this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Unit",this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Price",this.fb.control({value:''},Validators.required));
    this.billForm.patchValue({noOfItem: this.itemNo});
  }

  onSubmit(form: FormGroup){
    // console.log(form);
    this.http.post('http://localhost/testslim_1/public/updateBill',form.value).subscribe((response:any) => {
      if(response.status == true){
        this.router.navigate(['print-bill/'+btoa(response.data)]);
      }else{
        alert("Not Good");
      }
    });
  }

}
