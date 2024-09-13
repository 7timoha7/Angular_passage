import {Component, inject} from '@angular/core';
import {CategoriesType, HierarchicalCategory} from "../../interfaces/type";
import {CategoriesService} from "../../services/categories.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: CategoriesType[] = [];
  categoriesModernized: HierarchicalCategory[] = [];
  categoriesService = inject(CategoriesService);
  loading: boolean = false;
  router = inject(Router);

  ngOnInit() {
    this.loading = true;
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
        this.categoriesTree();
        this.categoriesService.categoryName.set(res)
      },
      error: (error: Error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  categoriesTree() {
    const buildCategoryTree = (categories: CategoriesType[], parentID?: string): HierarchicalCategory[] => {
      const sortedCategories = categories
        .filter((category) => category.ownerID === parentID)
        .slice()
        .sort((a, b) => {
          const aHasSubcategories = categories.some((cat) => cat.ownerID === a.ID);
          const bHasSubcategories = categories.some((cat) => cat.ownerID === b.ID);

          if (aHasSubcategories && !bHasSubcategories) return -1;
          if (!aHasSubcategories && bHasSubcategories) return 1;

          return a.name.localeCompare(b.name);
        });

      return sortedCategories.map((category) => {
        const subCategories = buildCategoryTree(categories, category.ID);
        return {...category, subCategories, expanded: false};
      });
    };

    const topLevelCategory = this.categories.find((category) => category.name === 'Товары' || category.name === 'товары');
    this.categoriesModernized = topLevelCategory ? buildCategoryTree(this.categories, topLevelCategory.ID) : [];
  }

  toggleCategory(category: HierarchicalCategory) {
    category.expanded = !category.expanded;
  }

  navigateToProductsCategory(categoryId: string) {
    this.router.navigate(['/products/', categoryId])
  }

}
