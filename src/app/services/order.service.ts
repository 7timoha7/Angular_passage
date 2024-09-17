import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderSendType} from "../interfaces/type";
import {apiUrl} from "../../constatns";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  orderSend(order: OrderSendType) {
    return this.http.post(`${apiUrl}/orders`, order)
  }
}
