import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule],
  template: `
    <div class="home__container">
      <section class="home__hero">
        <div class="home__hero-content">
          <mat-icon class="home__hero-icon">festival</mat-icon>
          <h1 class="home__hero-title">Bem-vindo ao Festival!</h1>
          <p class="home__hero-description">Descubra produtos incríveis e faça seus pedidos de forma fácil e segura.</p>
          <div class="home__hero-buttons">
            <button mat-raised-button color="primary" (click)="goToProducts()">
              <mat-icon>shopping_cart</mat-icon>
              Ver Produtos
            </button>
            <button mat-stroked-button color="primary" (click)="goToOrders()">
              <mat-icon>receipt</mat-icon>
              Meus Pedidos
            </button>
          </div>
        </div>
      </section>

      <section class="home__features">
        <mat-grid-list cols="3" rowHeight="1:1" gutterSize="2rem">
          <mat-grid-tile>
            <mat-card class="home__features-card festival-card">
              <mat-card-content>
                <mat-icon class="home__features-icon">shopping_bag</mat-icon>
                <h3 class="home__features-title">Produtos Diversos</h3>
                <p class="home__features-description">Encontre uma grande variedade de produtos para curtir o festival.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
          
          <mat-grid-tile>
            <mat-card class="home__features-card festival-card">
              <mat-card-content>
                <mat-icon class="home__features-icon">rocket_launch</mat-icon>
                <h3 class="home__features-title">Pedidos Rápidos</h3>
                <p class="home__features-description">Faça seus pedidos de forma simples e receba rapidamente.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
          
          <mat-grid-tile>
            <mat-card class="home__features-card festival-card">
              <mat-card-content>
                <mat-icon class="home__features-icon">security</mat-icon>
                <h3 class="home__features-title">Segurança Total</h3>
                <p class="home__features-description">Seus dados estão protegidos com a mais alta segurança.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </section>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
} 