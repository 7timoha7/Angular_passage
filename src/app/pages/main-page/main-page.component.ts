import {Component} from '@angular/core';
import {AppToolBarComponent} from "../../components/app-tool-bar/app-tool-bar.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";
import {ProductsComponent} from "../../components/products/products.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    AppToolBarComponent,
    ProductCardComponent,
    ProductsComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
}
