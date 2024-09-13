import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {PaginatorComponent} from "../paginator/paginator/paginator.component";
import {PageInfo, ProductType} from "../../interfaces/type";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {SpinnerComponent} from "../spinner/spinner.component";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PaginatorComponent,
    MatGridList,
    NgForOf,
    MatGridTile,
    SpinnerComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: ProductType[] = [];
  pageInfo?: PageInfo;
  loadingProducts = false;
  private router = inject(Router)
  private rout = inject(ActivatedRoute)
  categoriesService = inject(CategoriesService)
  categoryName: string = ''

  idCategory = signal<string>('');

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.rout.params.subscribe(params => {
      this.idCategory.set(params['id'] || '');


      this.loadProductsForCategoryOrDefault(this.idCategory(), 1);

    });


  }

  loadCategoryName(idCategory: string) {
    this.categoriesService.getCategories().subscribe({
      next: (res => {
        const foundCategory = res.find(item => item.ID === idCategory);
        if (foundCategory) {
          this.categoryName = foundCategory.name;
        } else {
          console.error('Категория не найдена');
        }
      }),
      error: (error: Error) => {
        console.error('Ошибка при загрузке категорий:', error);
      }
    });
  }

  loadProductsForCategoryOrDefault(idCategory: string, page: number) {
    if (idCategory) {
      this.loadProductsCategory(idCategory, page);
      this.loadCategoryName(idCategory)

    } else {
      this.loadProducts(page);
    }
  }

  loadProducts(page: number) {
    this.loadingProducts = true;
    this.productsService.getProducts(page).subscribe({
      next: (response) => {
        this.products = response.products;
        this.pageInfo = response.pageInfo;
      },
      error: (error: Error) => {
        console.error('Ошибка при загрузке продуктов:', error);
        this.loadingProducts = false;
      },
      complete: () => {
        this.loadingProducts = false;
      }
    });
  }

  loadProductsCategory(idCategory: string, page: number) {
    this.loadingProducts = true;

    this.productsService.getProductsCategory(idCategory, page).subscribe({
      next: (res => {
        this.products = res.products
        this.pageInfo = res.pageInfo
      }),
      error: (error: Error) => {
        console.log(error);
        this.loadingProducts = false;
      },
      complete: () => {
        this.loadingProducts = false;
      }
    })
  }

  onPageChange(event: PageEvent) {
    const nextPage = event.pageIndex + 1;

    if (nextPage >= 1) {
      this.loadProducts(nextPage);
    }
  }

  navigateToProduct(productId: string) {
    this.router.navigate(['/product/', productId]);
  }
}
