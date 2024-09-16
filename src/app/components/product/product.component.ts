import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {SpinnerComponent} from "../spinner/spinner.component";
import {MatCardModule} from "@angular/material/card";
import {apiUrl} from "../../../constatns";
import {BasketUpdateRequest, ProductType} from "../../interfaces/type";
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {ShoppingCardService} from "../../services/shopping-card.service";
import {ShoppingCardMiniComponent} from "../shopping-card/shopping-card-mini/shopping-card-mini.component";


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  rout = inject(ActivatedRoute)
  productService = inject(ProductsService)
  shoppingCardService = inject(ShoppingCardService)
  product: ProductType | null = null
  id: string = ''
  loadingProduct: boolean = false
  sessionKey: string = ''

  ngOnInit() {
    this.rout.params.subscribe(params => {
      this.id = params['id']
    })
    this.sessionKey = this.shoppingCardService.getSessionKey()

    this.loadingProduct = true
    this.productService.getProduct(this.id).subscribe({
      next: (response) => {
        this.product = response
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loadingProduct = false
      },
      complete: () => {
        this.loadingProduct = false
      }
    });
  }

  productImage(images: string[] | undefined): string {
    return images && images.length
      ? `${apiUrl}${images[0]}`
      : '/assets/img/no-photo.png';
  }

  addProductToShoppingCard(basketUpdateRequest: BasketUpdateRequest) {
    this.shoppingCardService.updateShoppingCard(basketUpdateRequest).subscribe({
      next: () => {
        this.shoppingCardService.getShoppingCard(this.sessionKey).subscribe({
          next: (res) => {
            this.shoppingCardService.shoppingCard.set(res);
          },
          error: (err) => console.error('Error loading shopping cart:', err)
        });
      },
      error: (err) => console.error('Error updating shopping cart:', err)
    });
  }
}
