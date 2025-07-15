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
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FormsModule
  ],
  template: `
    <div class="orders__container">
      <div class="orders__header">
        <mat-icon class="orders__header-icon">receipt_long</mat-icon>
        <h1 class="orders__header-title">Meus Pedidos</h1>
        <p class="orders__header-desc">Acompanhe todos os seus pedidos realizados na loja</p>
      </div>

      <div class="orders__search-bar">
        <mat-icon class="orders__search-icon">search</mat-icon>
        <input class="orders__search-input" placeholder="Buscar por número do pedido, produto..." [(ngModel)]="searchTerm" (input)="applyFilters()" />
        <select class="orders__filter-select" [(ngModel)]="sortOption" (change)="applyFilters()">
          <option value="">Ordenar por</option>
          <option value="total-asc">Valor: menor para maior</option>
          <option value="total-desc">Valor: maior para menor</option>
          <option value="date-desc">Data: mais recente</option>
          <option value="date-asc">Data: mais antiga</option>
          <option value="items-asc">Itens: menor para maior</option>
          <option value="items-desc">Itens: maior para menor</option>
        </select>
      </div>

      <div *ngIf="loading" class="orders__loading">
        <mat-spinner></mat-spinner>
        <p>Carregando pedidos...</p>
      </div>

      <div *ngIf="!loading && filteredOrders.length === 0" class="orders__empty">
        <mat-icon class="orders__empty-icon">shopping_cart</mat-icon>
        <h2 class="orders__empty-title">Nenhum pedido encontrado</h2>
        <p class="orders__empty-desc">Você ainda não fez nenhum pedido</p>
        <button mat-raised-button color="primary" routerLink="/products">
          <mat-icon>shopping_cart</mat-icon>
          Ver Produtos
        </button>
      </div>

      <div *ngIf="!loading && filteredOrders.length > 0" class="orders__list">
        <mat-card *ngFor="let order of filteredOrders" class="orders__card">
          <mat-card-header>
            <div class="orders__card-header">
              <div class="orders__card-id">
                <mat-icon>confirmation_number</mat-icon>
                <span>Pedido #{{ order.id }}</span>
              </div>
              <div class="orders__card-date">
                <mat-icon>event</mat-icon>
                <span>{{ order.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
            </div>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div class="orders__items">
              <div *ngFor="let item of order.items" class="orders__item">
                <div class="orders__item-info">
                  <mat-icon class="orders__item-icon">shopping_bag</mat-icon>
                  <span class="orders__item-name">{{ item.product?.name || 'Produto' }}</span>
                  <span class="orders__item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="orders__item-price">R$ {{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <mat-divider></mat-divider>
            <div class="orders__total-row">
              <span class="orders__total-label">Total:</span>
              <span class="orders__total-value">R$ {{ order.total.toFixed(2) }}</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  loading = true;
  searchTerm = '';
  sortOption = '';

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
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.snackBar.open('Erro ao carregar pedidos', 'Fechar', { duration: 3000, verticalPosition: 'top' });
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.orders];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toString().includes(term) ||
        order.items.some((item: any) => item.product?.name?.toLowerCase().includes(term))
      );
    }
    // Ordenação
    switch (this.sortOption) {
      case 'total-asc':
        filtered.sort((a, b) => a.total - b.total);
        break;
      case 'total-desc':
        filtered.sort((a, b) => b.total - a.total);
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'items-asc':
        filtered.sort((a, b) =>
          a.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) -
          b.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
        );
        break;
      case 'items-desc':
        filtered.sort((a, b) =>
          b.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) -
          a.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
        );
        break;
    }
    this.filteredOrders = filtered;
  }
} 