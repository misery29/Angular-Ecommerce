import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
      this.items$.next(this.items);
    }
  }

  private update() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.items$.next([...this.items]);
  }

  getItems() {
    return this.items$.asObservable();
  }

  getCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  addItem(item: CartItem) {
    const idx = this.items.findIndex(i => i.id === item.id);
    if (idx > -1) {
      this.items[idx].quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
    this.update();
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.update();
  }

  clear() {
    this.items = [];
    this.update();
  }
} 