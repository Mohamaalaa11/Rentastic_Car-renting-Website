import { Component } from '@angular/core';
import { Reservation } from '../../../Reservation';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  reservations: Reservation[]=[{car:{id:1,name:"Nissan",brand:"Sunny",modelYear:"2022",description:"Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.",color:"silver",category:"Luxury",seatCount:4,pricePerDay:250,image:"../../assets/imgs/gr.png",isCondition:true,gear:"Manual"},customerId:2,startDate:new Date(2023, 11, 15),endDate:new Date(2022, 11, 15),totalPrice:1500},{car:{id:1,name:"Nissan",brand:"Sunny",modelYear:"2022",description:"Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.",color:"silver",category:"Luxury",seatCount:4,pricePerDay:250,image:"../../assets/imgs/gr.png",isCondition:true,gear:"Manual"},customerId:2,startDate:new Date(2023, 11, 15),endDate:new Date(2022, 11, 15),totalPrice:1500}]

}
