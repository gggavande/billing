import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { ValidationService } from 'src/app/validation.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {
  itemNo : number = 1;
  billForm: any;
  customerList : any;
  data: any;
  keyword = 'name';

  // aa :any = encodeURIComponent('dvdxcvc');

  constructor(private fb: FormBuilder, private http : HttpClient, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit(){
    this.billForm = this.fb.group({
      custName: ['',Validators.required],
      noOfItem: ['1'],
      gst: ['1',Validators.required],
      isPaid: ['0',Validators.required],
      amountReceived: ['0'],
      item1: ['',Validators.required],
      item1Rate: [''],
      item1Unit: [''],
      item1Price: [{value:''},Validators.required],
      custGst : [''],
      custCity : [''],
      custMob : [''],
      custEmail : ['']

    });

    // this.http.get('http://localhost/testslim_1/public/getCustomerList').subscribe((response:any) => {
    //   this.customerList = response.data;
    //   // this.customerList = this.customerList.data;
    //   // console.log(this.customerList);
    // });
  }

  // get custName() { return this.billForm.get('custName'); }

  addEle(){
    this.itemNo++;
    this.billForm.addControl("item"+this.itemNo,this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Rate",this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Unit",this.fb.control('',Validators.required));
    this.billForm.addControl("item"+this.itemNo+"Price",this.fb.control({value:''},Validators.required));
    this.billForm.patchValue({noOfItem: this.itemNo});
  }

  onSubmit(form: FormGroup){
    console.log(form.value);
    this.http.post('http://localhost/testslim_1/public/saveBill',form.value).subscribe((response:any) => {
      if(response.status == true){
        this.router.navigate(['print-bill/'+btoa(response.data)]);
      }else{
        alert("Not Good");
      }
    });
  }

  calcAmount(ind : any){
    let rate : any = this.billForm.get('item'+ind+'Rate').value;
    let unit : any = this.billForm.get('item'+ind+'Unit').value;
    // console.log(unit);
    if(rate && unit){
      // let price = parseInt(rate)*parseInt(unit);
      let price = rate*unit;
      this.billForm.patchValue({['item'+ind+'Price']: price});
    }
  }



  // this.data = [
  //    {
  //      id: 1,
  //      name: 'Dakota Gaylord PhD',
  //      address: '14554 Smith Mews'
  //    },
  //    {
  //      id: 2,
  //      name: 'Maria Legros',
  //      address: '002 Pagac Drives'
  //    },
  //    {
  //      id: 3,
  //      name: 'Brandyn Fritsch',
  //      address: '8542 Lowe Mountain'
  //    },
  //    {
  //      id: 4,
  //      name: 'Glenna Ward V',
  //      address: '1260 Oda Summit'
  //    },
  //    {
  //      id: 5,
  //      name: 'Jamie Veum',
  //      address: '5017 Lowe Route'
  //    }
  // ];

  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }

  selectEvent(item) {
    console.log(item);
    console.log('9999999');

    this.billForm.patchValue({custCity: item.address});
    this.billForm.patchValue({custGst: item.gst_no});
    this.billForm.patchValue({custMob: item.mobile});
    this.billForm.patchValue({custEmail: item.email});
    // do something with selected item
  }

  onChangeSearch(val: string) {
    this.http.post('http://localhost/testslim_1/public/getCustomerList',{q : val}).subscribe((response:any) => {
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
