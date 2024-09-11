import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spiner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.css'
})
export class SpinerComponent {

}
