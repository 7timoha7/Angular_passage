import {inject, Injectable, signal} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {v4 as uuidv4} from 'uuid';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../constatns";
import {BasketTypeOnServerMutation, BasketUpdateRequest} from "../interfaces/type";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  cookiesService = inject(CookieService)
  http = inject(HttpClient)
  shoppingCard = signal<BasketTypeOnServerMutation | null>(null)

  setSessionKey() {
    const sessionKey = uuidv4();
    this.cookiesService.set('session_key', sessionKey, 100)
  }

  getSessionKey() {
    return this.cookiesService.get('session_key')
  }

  createShoppingCard(sessionKey: string) {
    return this.http.post<BasketTypeOnServerMutation>(`${apiUrl}/basket`, sessionKey)
  }

  getShoppingCard(sessionKey: string) {
    return this.http.get<BasketTypeOnServerMutation>(`${apiUrl}/basket/${sessionKey}`)
  }

  updateShoppingCard(basketUpdateRequest: BasketUpdateRequest) {
    return this.http.patch(`${apiUrl}/basket/${basketUpdateRequest.sessionKey}`, {
      product_id: basketUpdateRequest.product_id,
      action: basketUpdateRequest.action
    })
  }
}
