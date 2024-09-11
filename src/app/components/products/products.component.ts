import {Component} from '@angular/core';
import {ProductCardComponent} from "../product-card/product-card.component";
import {ProductsService} from "../../services/products.service";
import {PaginatorComponent} from "../paginator/paginator/paginator.component";
import {PageInfo, ProductType} from "../../interfaces/type";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {SpinnerComponent} from "../spinner/spinner.component";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    PaginatorComponent,
    MatGridList,
    NgForOf,
    MatGridTile,
    SpinnerComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: ProductType[] = []; // Массив для хранения продуктов
  pageInfo?: PageInfo; // Делаем свойство необязательным
  currentPage = 1; // Текущая страница
  loadingProducts: boolean = false


  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.loadProducts(this.currentPage); // Загружаем продукты при инициализации компонента
  }

  loadProducts(page: number) {
    this.loadingProducts = true
    this.productsService.getProducts(page).subscribe({
      next: (response) => {
        this.products = response.products; // Сохраняем полученные продукты
        this.pageInfo = response.pageInfo; // Сохраняем информацию о страницах
      },
      error: (error: Error) => {
        console.error('Ошибка при загрузке продуктов:', error);
      },
      complete: () => {
        this.loadingProducts = false
      }
    });
  }

  onPageChange(event: { pageIndex: number }) {
    this.currentPage = event.pageIndex; // Обновляем текущую страницу
    this.loadProducts(this.currentPage); // Перезагружаем продукты для новой страницы
  }
}
