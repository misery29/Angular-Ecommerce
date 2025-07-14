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
  selector: 'app-signup',
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
    <div class="signup">
      <mat-card class="signup__card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="signup__icon">person_add</mat-icon>
            Cadastro
          </mat-card-title>
          <mat-card-subtitle>Crie sua conta</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="signup__form">
            <mat-form-field appearance="outline" class="signup__form-field">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="name" placeholder="Seu nome completo">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="signupForm.get('name')?.hasError('required')">
                Nome é obrigatório
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="signup__form-field">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="seu@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="signupForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="signupForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="signup__form-field">
              <mat-label>Telefone</mat-label>
              <input matInput formControlName="phone" placeholder="(11) 99999-9999">
              <mat-icon matSuffix>phone</mat-icon>
              <mat-error *ngIf="signupForm.get('phone')?.hasError('required')">
                Telefone é obrigatório
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="signup__form-field">
              <mat-label>Senha</mat-label>
              <input matInput type="password" formControlName="password" placeholder="Mínimo 6 caracteres">
              <mat-icon matSuffix>lock</mat-icon>
              <mat-error *ngIf="signupForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="signupForm.get('password')?.hasError('minlength')">
                Senha deve ter pelo menos 6 caracteres
              </mat-error>
            </mat-form-field>
            <button 
              mat-raised-button 
              color="primary" 
              type="submit" 
              class="signup__submit-btn"
              [disabled]="signupForm.invalid || loading">
              <mat-icon *ngIf="!loading">person_add</mat-icon>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="accent" (click)="goToLogin()">
            Já tem conta? Faça login
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      const userData = this.signupForm.value;

      this.authService.signup(userData).subscribe({
        next: (response) => {
          this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro no cadastro:', error);
          const message = error.error?.message || 'Erro ao fazer cadastro';
          this.snackBar.open(message, 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
} 