import {Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductsComponent} from "./components/products/products.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductComponent},
      {path: 'products/:id', component: ProductsComponent}
    ]
  }
];
