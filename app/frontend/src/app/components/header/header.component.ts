import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="header__toolbar">
      <div class="header__container">
        <div class="header__logo">
          <mat-icon class="header__icon">festival</mat-icon>
          <span class="header__text">Festival App</span>
          <span *ngIf="currentUser?.role === 'admin'" class="header__admin-badge">Admin</span>
        </div>
        
        <nav class="header__nav">
          <button mat-button routerLink="/" routerLinkActive="header__nav-button--active" [routerLinkActiveOptions]="{exact: true}" class="header__nav-button">
            <mat-icon>home</mat-icon>
            Home
          </button>
          <button mat-button routerLink="/products" routerLinkActive="header__nav-button--active" class="header__nav-button">
            <mat-icon>shopping_cart</mat-icon>
            Produtos
          </button>
          <button mat-button routerLink="/orders" routerLinkActive="header__nav-button--active" class="header__nav-button">
            <mat-icon>receipt</mat-icon>
            Meus Pedidos
          </button>
          <button mat-raised-button color="accent" routerLink="/login" routerLinkActive="header__nav-button--active" *ngIf="!isLoggedIn" class="header__nav-button">
            <mat-icon>login</mat-icon>
            Login
          </button>
          <button mat-stroked-button (click)="logout()" *ngIf="isLoggedIn" class="header__nav-button">
            <mat-icon>logout</mat-icon>
            Sair
          </button>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    console.log('HEADER CONSTRUCTOR');
  }

  ngOnInit() {
    console.log('HEADER INIT');
    this.authService.currentUser$.subscribe(user => {
      console.log('HEADER USER:', user);
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.cdr.detectChanges();
    });
  }

  logout() {
    const token = this.authService.getToken();
    if (token) {
      // Chama o endpoint de logout do backend
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).finally(() => {
        this.authService.logout();
        this.snackBar.open('Logout realizado com sucesso!', 'Fechar', { duration: 3000, verticalPosition: 'top' });
        this.router.navigate(['/']);
      });
    } else {
      this.authService.logout();
      this.snackBar.open('Logout realizado com sucesso!', 'Fechar', { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/']);
    }
  }
} 