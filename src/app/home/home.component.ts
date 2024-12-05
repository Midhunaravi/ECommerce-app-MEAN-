import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];
  productsTmp:any = []
  filteredProducts: any =[];
categories: any =[];
  uniqueCategories: any=[];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getProducts();

    this.apiService.currentProducts.subscribe((data:any) => {
      this.products = data.products; this.uniqueCategories = [...new Set(this.products.map((product: { category: any; }) => product.category))];
      this.filteredProducts = this.products;
    });
  }
  
  filterByCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    if (category === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product: { category: string; }) => product.category === category);
    }
  }}