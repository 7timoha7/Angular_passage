import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageInfo, ProductType} from "../interfaces/type";
import {apiUrl} from "../../constatns";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: string): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiUrl}/products/${id}`)
  }

  getProducts(page: number): Observable<{ products: ProductType[]; pageInfo: PageInfo }> {
    return this.http.get<{ products: ProductType[]; pageInfo: PageInfo }>(`${apiUrl}/products/news?page=${page}`);
  }

  getProductsCategory(id: string, page: number): Observable<{ products: ProductType[]; pageInfo: PageInfo }> {
    return this.http.get<{ products: ProductType[]; pageInfo: PageInfo }>(`${apiUrl}/products?category=${id}&page=${page}`);
  }

}
