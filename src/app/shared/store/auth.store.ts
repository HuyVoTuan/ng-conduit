import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthUserDto, User } from "../models/user.model";
import {
  AuthService,
  SignInBodyRequest,
  SignUpBodyRequest,
} from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthStore {
  private currentUserSubject: BehaviorSubject<AuthUserDto | null> =
    new BehaviorSubject<AuthUserDto | null>(this.getUserFromLocalStorage());

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private authService: AuthService, private router: Router) {}

  get currentUser$(): Observable<AuthUserDto | null> {
    return this.currentUserSubject.asObservable();
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  signin(user: SignInBodyRequest): Observable<any> {
    return this.authService.signin(user).pipe(
      tap((response) => {
        const userData = response.data;
        this.setUserInStore(userData);
      })
    );
  }

  signup(user: SignUpBodyRequest): Observable<any> {
    return this.authService.signup(user).pipe(
      tap((response) => {
        const userData = response.data;
        this.setUserInStore(userData);
      })
    );
  }

  signout(): void {
    this.clearUserFromStore();
    this.router.navigate(["/auth/sign-in"]);
  }

  refreshToken(): Observable<any> {
    return this.authService.refreshToken().pipe(
      tap((response) => {
        const userData = response.user;
        this.setUserInStore(userData);
      })
    );
  }

  private setUserInStore(user: AuthUserDto): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearUserFromStore(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private isAuthenticated(): boolean {
    return !!this.getUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): AuthUserDto | null {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }
}
