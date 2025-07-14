import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatChipsModule, MatBadgeModule, MatProgressSpinnerModule],
  template: `
    <div class="products">
      <div class="products__header">
        <mat-icon class="products__header-icon">shopping_cart</mat-icon>
        <h1 class="products__header-title">Produtos do Festival</h1>
        <p class="products__header-desc">Encontre os melhores produtos para o seu evento</p>
      </div>
      <div *ngIf="loading" class="products__loading">
        <mat-spinner></mat-spinner>
        <p>Carregando produtos...</p>
      </div>
      <mat-grid-list cols="3" rowHeight="1:1.2" gutterSize="2rem" *ngIf="!loading">
        <mat-grid-tile *ngFor="let product of products">
          <mat-card class="products__card" (click)="addToCart(product)">
            <img mat-card-image [src]="product.imageUrl || 'https://via.placeholder.com/300x200'" [alt]="product.name">
            <mat-card-content>
              <h3 class="products__card-title">{{ product.name }}</h3>
              <p class="products__card-desc">{{ product.description }}</p>
              <div class="products__card-price-row">
                <span class="products__card-price">R$ {{ product.price.toFixed(2) }}</span>
                <button mat-raised-button color="primary" class="products__add-btn">
                  <mat-icon>add_shopping_cart</mat-icon>
                  Adicionar
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
      <mat-card class="products__cart" *ngIf="cartItems.length > 0">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>shopping_cart</mat-icon>
            Carrinho ({{ cartItems.length }} itens)
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="products__cart-items">
            <div *ngFor="let item of cartItems" class="products__cart-item">
              <span>{{ item.name }}</span>
              <span>R$ {{ item.price.toFixed(2) }}</span>
              <button mat-icon-button color="warn" (click)="removeFromCart(item.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
          <div class="products__cart-total">
            <strong>Total: R$ {{ getTotalPrice().toFixed(2) }}</strong>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="accent" (click)="checkout()" class="products__checkout-btn">
            <mat-icon>check_circle</mat-icon>
            Finalizar Pedido
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.snackBar.open(`${product.name} adicionado ao carrinho!`, 'Fechar', { duration: 2000 });
  }

  removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Faça login para finalizar o pedido', 'Fechar', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackBar.open('Adicione produtos ao carrinho', 'Fechar', { duration: 3000 });
      return;
    }

    // Agrupar itens por produto e contar quantidade
    const itemCounts = new Map<number, number>();
    this.cartItems.forEach(item => {
      itemCounts.set(item.id, (itemCounts.get(item.id) || 0) + 1);
    });

    const orderItems = Array.from(itemCounts.entries()).map(([productId, quantity]) => ({
      productId,
      quantity
    }));

    const order = { items: orderItems };

    this.apiService.createOrder(order).subscribe({
      next: (order) => {
        this.snackBar.open('Pedido criado com sucesso!', 'Fechar', { duration: 3000 });
        this.cartItems = [];
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
        this.snackBar.open('Erro ao criar pedido', 'Fechar', { duration: 3000 });
      }
    });
  }
} 