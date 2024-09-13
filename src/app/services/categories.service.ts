import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../constatns";
import {CategoriesType} from "../interfaces/type";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  http = inject(HttpClient)
  categoryName = signal<CategoriesType[]>([])

  getCategories() {
    return this.http.get<CategoriesType[]>(`${apiUrl}/categories`)
  }

}
