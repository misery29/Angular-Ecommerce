import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartDrawerService {
  private opened = new BehaviorSubject<boolean>(false);
  opened$ = this.opened.asObservable();
  open() { this.opened.next(true); }
  close() { this.opened.next(false); }
} 