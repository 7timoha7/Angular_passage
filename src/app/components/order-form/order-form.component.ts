import {Component, inject} from '@angular/core';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {OrderService} from "../../services/order.service";
import {ShoppingCardService} from "../../services/shopping-card.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    DialogComponent
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {

  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService);
  shoppingCardService = inject(ShoppingCardService)
  dialog = inject(MatDialog)

  orderForm: FormGroup;


  constructor() {
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      phone: ['', Validators.required],
      email: [''],
      paymentMethod: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      address: [{value: '', disabled: true}, Validators.required],
      comment: ['']
    });

    this.orderForm.get('deliveryMethod')?.valueChanges.subscribe(value => {
      if (value === 'delivery') {
        this.orderForm.get('address')?.enable();
      } else {
        this.orderForm.get('address')?.disable();
      }
    });
  }
}
