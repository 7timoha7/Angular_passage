import {Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout/layout.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: MainPageComponent}
    ]
  }
];
