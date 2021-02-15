import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { ValidationService } from 'src/app/validation.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export interface AccInt {
  accId: string;
  amount: number;
  detailDesc: number;
  shortDesc: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {
  accountingForm : any;
  tableData : AccInt;

  constructor(private fb: FormBuilder, private http : HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountingForm = this.fb.group({
      shortDesc: ['',Validators.required],
      amount: ['1'],
      status: ['1',Validators.required],
      detailDesc: ['',Validators.required],
      date: ['',Validators.required]
    });

    this.fetchTable(1);
  }

  onSubmit(form: FormGroup){
    // console.log(form.value);
    this.http.post('http://localhost/testslim_1/public/addAccounting',form.value).subscribe((response:any) => {
      // console.log(response);
      this.fetchTable(1);
      // if(response.status == true){
      //   this.router.navigate(['print-bill/'+btoa(response.data)]);
      // }else{
      //   alert("Not Good");
      // }
    });
  }

  fetchTable(page: number) {
    // page = 1;
    this.http.post('http://localhost/testslim_1/public/fetchTable',{q : page}).subscribe((response:any) => {
      // console.log(response);
      if(response.status == true){
        this.tableData = response.data;
      }
      console.log(this.tableData);
    });
  }

}
