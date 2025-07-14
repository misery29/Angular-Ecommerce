import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api'; // Usando proxy configurado

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  // ===== PRODUTOS =====
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`, { headers: this.getHeaders() });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products`, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/products/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  // ===== AUTENTICAÇÃO =====
  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, user, { headers: this.getHeaders() });
  }

  signin(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, credentials, { headers: this.getHeaders() });
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/me`, { headers: this.getHeaders() });
  }

  // ===== PEDIDOS =====
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order, { headers: this.getHeaders() });
  }

  getUserOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`, { headers: this.getHeaders() });
  }

  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/${id}`, { headers: this.getHeaders() });
  }

  getAllOrdersForAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders/admin/all`, { headers: this.getHeaders() });
  }
} 