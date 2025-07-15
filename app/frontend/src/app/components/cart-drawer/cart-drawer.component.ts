import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../../services/cart.service';
import { CartDrawerService } from './cart-drawer.service';
import { CartItem } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="cart-drawer" [class.open]="open">
      <div class="cart-drawer__header">
        <span>Carrinho</span>
        <button mat-icon-button (click)="close()"><mat-icon>close</mat-icon></button>
      </div>
      <div class="cart-drawer__content">
        <div *ngIf="items.length === 0" class="cart-drawer__empty">Seu carrinho está vazio.</div>
        <div *ngFor="let item of items" class="cart-drawer__item">
          <img [src]="item.imageUrl" [alt]="item.name" class="cart-drawer__item-img" />
          <div class="cart-drawer__item-info">
            <span class="cart-drawer__item-name">{{ item.name }}</span>
            <span class="cart-drawer__item-qty">x{{ item.quantity }}</span>
            <span class="cart-drawer__item-price">R$ {{ item.price.toFixed(2) }}</span>
          </div>
          <button mat-icon-button color="warn" (click)="remove(item.id)"><mat-icon>delete</mat-icon></button>
        </div>
      </div>
      <div class="cart-drawer__footer" *ngIf="items.length > 0">
        <div class="cart-drawer__total">Total: <strong>R$ {{ total.toFixed(2) }}</strong></div>
        <button mat-raised-button color="primary" (click)="checkout()" class="cart-drawer__checkout-btn" [disabled]="loading">
          <mat-icon *ngIf="!loading">check_circle</mat-icon>
          <span *ngIf="!loading">Finalizar Pedido</span>
          <mat-spinner *ngIf="loading" diameter="22"></mat-spinner>
        </button>
      </div>
    </div>
    <div class="cart-drawer__backdrop" *ngIf="open" (click)="close()"></div>
  `,
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  open = false;
  items: CartItem[] = [];
  total = 0;
  loading = false;
  constructor(
    private cart: CartService,
    private drawer: CartDrawerService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.drawer.opened$.subscribe(val => this.open = val);
    this.cart.getItems().subscribe(items => {
      this.items = items;
      this.total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });
  }
  close() {
    this.drawer.close();
  }
  remove(id: number) {
    this.cart.removeItem(id);
  }
  checkout() {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Faça login para finalizar o pedido', 'Fechar', { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login']);
      return;
    }
    if (this.items.length === 0) {
      this.snackBar.open('Adicione produtos ao carrinho', 'Fechar', { duration: 3000, verticalPosition: 'top' });
      return;
    }
    this.loading = true;
    const orderItems = this.items.map(item => ({ productId: item.id, quantity: item.quantity }));
    const order = { items: orderItems };
    this.apiService.createOrder(order).subscribe({
      next: () => {
        this.snackBar.open('Pedido criado com sucesso!', 'Fechar', { duration: 3000, verticalPosition: 'top' });
        this.cart.clear();
        this.close();
        this.router.navigate(['/orders']);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
        this.snackBar.open('Erro ao criar pedido', 'Fechar', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
      }
    });
  }
} 