import { Component } from '@angular/core';
import {AppToolBarComponent} from "../app-tool-bar/app-tool-bar.component";
import {RouterOutlet} from "@angular/router";
import {CategoriesComponent} from "../categories/categories.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AppToolBarComponent,
    RouterOutlet,
    CategoriesComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
