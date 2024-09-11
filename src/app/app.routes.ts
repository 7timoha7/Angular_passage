import {Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout/layout.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ProductComponent} from "./components/product/product.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductComponent}
    ]
  }
];
