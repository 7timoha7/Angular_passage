import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {SpinnerComponent} from "../spinner/spinner.component";
import {MatCardModule} from "@angular/material/card";
import {apiUrl} from "../../../constatns";
import {ProductType} from "../../interfaces/type";


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatCardModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  rout = inject(ActivatedRoute)
  productService = inject(ProductsService)
  product: ProductType | null = null
  id: string = ''
  loadingProduct: boolean = false

  ngOnInit() {
    this.rout.params.subscribe(params => {
      this.id = params['id']
    })

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
}
