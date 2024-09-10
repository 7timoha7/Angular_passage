import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ProductType} from "../../interfaces/type";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product?: ProductType; // Делаем свойство необязательным

  get productImage(): string | undefined {
    return this.product?.images?.[0];
  }
}
