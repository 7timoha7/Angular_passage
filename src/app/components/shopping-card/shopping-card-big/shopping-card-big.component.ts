import {Component, inject} from '@angular/core';
import {ShoppingCardService} from "../../../services/shopping-card.service";
import {BasketTypeOnServerMutation, BasketUpdateRequest} from "../../../interfaces/type";
import {MatTableModule} from "@angular/material/table";
import {apiUrl} from "../../../../constatns";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-card-big',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './shopping-card-big.component.html',
  styleUrl: './shopping-card-big.component.css'
})
export class ShoppingCardBigComponent {
  shoppingCardService = inject(ShoppingCardService)
  shoppingCard: BasketTypeOnServerMutation | null = null
  router = inject(Router)

  // ngOnInit() {
  //
  // }

  productImage(images: string[] | undefined): string {
    return images && images.length
      ? `${apiUrl}${images[0]}`
      : '/assets/img/no-photo.png';
  }

  clearShoppingCard(basketUpdateRequest: BasketUpdateRequest) {
    this.shoppingCardService.updateShoppingCard(basketUpdateRequest).subscribe({

      next: () => {
        this.shoppingCardService.getShoppingCard(this.shoppingCardService.getSessionKey()).subscribe({
          next: (res) => {
            this.shoppingCardService.shoppingCard.set(res);
          },
          error: (err) => console.error('Error loading shopping cart:', err)
        });
      },
      error: (err) => console.error('Error updating shopping cart:', err)
    })
  }

  navigate() {
    this.router.navigate(['/order'])
  }

}
