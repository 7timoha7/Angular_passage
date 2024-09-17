import {Component, inject, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ShoppingCardService} from "../../services/shopping-card.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class DialogComponent {
  @Input() disabled: boolean | undefined

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'app-dialog-dialog',
  templateUrl: 'dialog-dialog.component.html',
  standalone: true,
  styleUrls: ['./dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialog {
  router = inject(Router)
  shoppingCardService = inject(ShoppingCardService)

  onClickClose() {

    this.shoppingCardService.updateShoppingCard({
      sessionKey: this.shoppingCardService.shoppingCard()?.session_key,
      action: "clear",
      product_id: "clear"
    }).subscribe({

      next: () => {
        this.shoppingCardService.getShoppingCard(this.shoppingCardService.getSessionKey()).subscribe({
          next: (res) => {
            this.shoppingCardService.shoppingCard.set(res);
          },
          error: (err) => console.error('Error loading shopping cart:', err)
        });
      },
      error: (err) => console.error('Error updating shopping cart:', err)
    })

    this.router.navigate([''])
  }
}
