import {Component, inject, signal} from '@angular/core';
import {ShoppingCardService} from "../../../services/shopping-card.service";
import {JsonPipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shopping-card-mini',
  standalone: true,
  imports: [
    JsonPipe,
    MatIconModule,
    MatBadgeModule,
    RouterLink
  ],
  templateUrl: './shopping-card-mini.component.html',
  styleUrl: './shopping-card-mini.component.css'
})
export class ShoppingCardMiniComponent {
  shoppingCardService = inject(ShoppingCardService)
  sessionKey: string = ''
  itemsCount = signal(0)

  ngOnInit() {
    this.sessionKey = this.shoppingCardService.getSessionKey()

    if (!this.sessionKey) {
      this.shoppingCardService.setSessionKey()
      this.sessionKey = this.shoppingCardService.getSessionKey()
      this.createShoppingCard(this.sessionKey)
    } else {
      this.getShoppingCard(this.sessionKey)
    }
  }

  createShoppingCard(sessionKey: string) {
    this.shoppingCardService.createShoppingCard(sessionKey).subscribe({
      next: res => {
        this.shoppingCardService.shoppingCard.set(res)
      },
      error: (error: Error) => {
        console.log('Ошибка при создании корзины ' + error)
      }
    })
  }

  getShoppingCard(sessionKey: string) {
    this.shoppingCardService.getShoppingCard(sessionKey).subscribe({
      next: (res) => {
        this.shoppingCardService.shoppingCard.set(res)
      },
      error: (error: Error) => {
        console.log('Ошибка при получении корзины ' + error)
      }
    })
  }

  get itemCount(): number {
    return this.shoppingCardService.shoppingCard()?.items.length || 0;
  }

}
