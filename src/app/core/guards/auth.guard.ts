import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AuthStore } from "@app/shared/store";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authStore: AuthStore, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean | UrlTree> {
    return this.authStore.isUserAuthenticated$.pipe(
      take(1), // Take only the first value emitted
      map((isAuthenticated) => {
        return isAuthenticated
          ? true
          : this.router.createUrlTree(["/auth/sign-in"]);
      })
    );
  }
}
