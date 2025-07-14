import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="login">
      <mat-card class="login__card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="login__icon">login</mat-icon>
            Login
          </mat-card-title>
          <mat-card-subtitle>Entre com suas credenciais</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login__form">
            <mat-form-field appearance="outline" class="login__form-field">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="seu@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="login__form-field">
              <mat-label>Senha</mat-label>
              <input matInput type="password" formControlName="password" placeholder="Sua senha">
              <mat-icon matSuffix>lock</mat-icon>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>
            <button 
              mat-raised-button 
              color="primary" 
              type="submit" 
              class="login__submit-btn"
              [disabled]="loginForm.invalid || loading">
              <mat-icon *ngIf="!loading">login</mat-icon>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="accent" (click)="goToSignup()">
            Não tem conta? Cadastre-se
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.signin({ email, password }).subscribe({
        next: (response) => {
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          const message = error.error?.message || 'Erro ao fazer login';
          this.snackBar.open(message, 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
} 