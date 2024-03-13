import { Component } from '@angular/core';
import {Car} from '../../Car'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  cars :Car[]=[{id:1,name:"Nissan",brand:"Sunny",modelYear:"2022",color:"silver",category:"Luxury",seatCount:4,pricePerDay:250,image:"../../assets/imgs/car1.png",isCondition:true,gear:"Manual"}]
  
}
