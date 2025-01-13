import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent());

  isLoggedIn$ = this.loggedIn.asObservable(); // Observable pour suivre l'état de connexion

  constructor() {}

  private isTokenPresent(): boolean {
    return !!sessionStorage.getItem('token'); // Vérifie si le token est présent
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  getUser(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parse and return user data
  }

  logout(): void {
    sessionStorage.clear(); // Supprime les données de session
    this.loggedIn.next(false); // Mets à jour l'état d'authentification
  }

  login(token: string): void {
    sessionStorage.setItem('token', token);
    this.loggedIn.next(true); // Mets à jour l'état d'authentification
  }
}
