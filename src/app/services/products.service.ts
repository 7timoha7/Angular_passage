import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {PageInfo, ProductType} from "../interfaces/type";
import {apiUrl} from "../../constatns";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  // http = inject(HttpClient)
  product = signal<ProductType | null>(null)

  constructor(private http: HttpClient) {
  } // Внедрение зависимости HttpClient

  // Метод для получения одного продукта
  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiUrl}/products/${id}`).pipe(
      tap(res => this.product.set(res))
    )
  }

  // Метод для получения продуктов с пагинацией
  getProducts(page: number): Observable<{ products: ProductType[]; pageInfo: PageInfo }> {
    return this.http.get<{ products: ProductType[]; pageInfo: PageInfo }>(`${apiUrl}/products/news?page=${page}`);
  }
}
