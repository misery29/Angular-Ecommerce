import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { CartDrawerService } from '../cart-drawer/cart-drawer.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatBadgeModule],
  template: `
    <button class="cart-btn" mat-fab (click)="openDrawer()">
      <mat-icon>shopping_cart</mat-icon>
      <span *ngIf="count > 0" class="cart-btn__badge" matBadge="{{ count }}" matBadgeColor="accent"></span>
    </button>
  `,
  styleUrl: './cart-button.component.scss'
})
export class CartButtonComponent {
  count = 0;
  constructor(private cart: CartService, private drawer: CartDrawerService) {
    this.cart.getItems().subscribe(items => {
      this.count = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }
  openDrawer() {
    this.drawer.open();
  }
} 