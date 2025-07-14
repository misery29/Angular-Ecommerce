import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="orders-container">
      <div class="orders-header">
        <mat-icon class="header-icon">receipt</mat-icon>
        <h1>Meus Pedidos</h1>
        <p>Acompanhe todos os seus pedidos</p>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Carregando pedidos...</p>
      </div>

      <div *ngIf="!loading && orders.length === 0" class="empty-container">
        <mat-icon class="empty-icon">shopping_cart</mat-icon>
        <h2>Nenhum pedido encontrado</h2>
        <p>Você ainda não fez nenhum pedido</p>
        <button mat-raised-button color="primary" routerLink="/products">
          <mat-icon>shopping_cart</mat-icon>
          Ver Produtos
        </button>
      </div>

      <div *ngIf="!loading && orders.length > 0" class="orders-list">
        <mat-card *ngFor="let order of orders" class="order-card">
          <mat-card-header>
            <mat-card-title>
              Pedido #{{ order.id }}
            </mat-card-title>
            <mat-card-subtitle>
              {{ order.createdAt | date:'dd/MM/yyyy HH:mm' }}
            </mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="order-items">
              <div *ngFor="let item of order.items" class="order-item">
                <div class="item-info">
                  <span class="item-name">{{ item.product?.name || 'Produto' }}</span>
                  <span class="item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="item-price">R$ {{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="order-total">
              <strong>Total: R$ {{ order.total.toFixed(2) }}</strong>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .orders-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .orders-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .orders-header h1 {
      color: #333;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .orders-header p {
      color: #666;
      font-size: 1.1rem;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem;
      gap: 1rem;
    }

    .loading-container p {
      color: #666;
      font-size: 1.1rem;
    }

    .empty-container {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ccc;
      margin-bottom: 1rem;
    }

    .empty-container h2 {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .empty-container p {
      color: #999;
      margin-bottom: 2rem;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .order-card {
      margin-bottom: 1rem;
    }

    .order-items {
      margin: 1rem 0;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .item-name {
      font-weight: 500;
    }

    .item-quantity {
      color: #666;
      font-size: 0.9rem;
    }

    .item-price {
      font-weight: 500;
      color: var(--primary-color);
    }

    .order-total {
      text-align: right;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid #eee;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .orders-container {
        padding: 1rem;
      }
      
      .orders-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Faça login para ver seus pedidos', 'Fechar', { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.apiService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.snackBar.open('Erro ao carregar pedidos', 'Fechar', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
      }
    });
  }
} 