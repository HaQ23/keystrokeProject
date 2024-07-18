import { Injectable } from '@angular/core';
import { User, UserConsentData, UserUpdateData } from '../models/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'loggedUser';
  private baseUrl = environment.baseUrl;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { email }).pipe(
      tap((user) => {
        this.user$.next(user);
        this.saveUserToSession(user);
      })
    );
  }

  logout(): void {
    if (this.sessionStorageAvailable) {
      sessionStorage.removeItem(this.STORAGE_KEY);
      this.user$.next(null);
      this.router.navigate(['/login']);
    }
  }
  updateUser(userEmail: string, userData: UserUpdateData): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/${userEmail}`, userData)
      .pipe(
        tap((user) => {
          this.user$.next(user);
          this.saveUserToSession(user);
        })
      );
  }
  setUserConsent(
    userEmail: string,
    userData: UserConsentData
  ): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/set-consent/${userEmail}`, userData)
      .pipe(
        tap((user) => {
          this.user$.next(user);
          this.saveUserToSession(user);
        })
      );
  }
  removeUserConsent(userEmail: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/delete-consent/${userEmail}`, {})
      .pipe(
        tap((user) => {
          this.user$.next(user);
          this.saveUserToSession(user);
        })
      );
  }
  autoLogin() {
    if (this.sessionStorageAvailable) {
      const userData: User = JSON.parse(
        sessionStorage.getItem(this.STORAGE_KEY) as string
      );
      if (!userData) return;
      this.user$.next(userData);
    }
    return;
  }
  getUserData(): User | null {
    return this.user$.value;
  }
  isLoggedIn(): boolean {
    return !!this.user$.value;
  }
  private saveUserToSession(user: User): void {
    if (this.sessionStorageAvailable) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
  }
  private get sessionStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }
}
