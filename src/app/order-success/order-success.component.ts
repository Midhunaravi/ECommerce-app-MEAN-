import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit{
  orderId='';

  constructor( private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.params.subscribe((data) =>{
      this.orderId = data['id']
    })
  }

}
