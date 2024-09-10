import {Inject, Injectable} from '@angular/core';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageInfo, ProductType} from "../interfaces/type";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8000'; // Базовый URL для API

  constructor(private http: HttpClient) {} // Внедрение зависимости HttpClient

  // Метод для получения одного продукта
  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.apiUrl}/products/${id}`);
  }

  // Метод для получения продуктов с пагинацией
  getProducts(page: number): Observable<{ products: ProductType[]; pageInfo: PageInfo }> {
    return this.http.get<{ products: ProductType[]; pageInfo: PageInfo }>(`${this.apiUrl}/products/news?page=${page}`);
  }
}
