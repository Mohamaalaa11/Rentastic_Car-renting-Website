import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  form=new FormGroup({
    cartype:new FormControl<string>(''),
    startDate : new FormControl<Date>(new Date),
    endDate:new FormControl<Date>(new Date)
  })
  cartypes:string[]=["BMW","Audi","Nissan","Lamborghini"]
  GetData(){
    console.log(this.form.value)
  }

}
