import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ShoppingCardMiniComponent} from "../shopping-card/shopping-card-mini/shopping-card-mini.component";

@Component({
  selector: 'app-app-tool-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, ShoppingCardMiniComponent],
  templateUrl: './app-tool-bar.component.html',
  styleUrl: './app-tool-bar.component.css'
})
export class AppToolBarComponent {

}
