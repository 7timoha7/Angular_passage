import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ProductType} from "../../interfaces/type";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {apiUrl} from "../../../constatns";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, NgIf, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product?: ProductType; // Делаем свойство необязательным

  get productImage(): string {
    return this.product?.images?.length
      ? `${apiUrl}${this.product.images[0]}`
      : '/assets/img/no-photo.png';
  }
}
