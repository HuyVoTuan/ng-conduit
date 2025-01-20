import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { User } from "@app/shared/models";
import { ApiService } from "@app/core/services";

// #region Interfaces
export type SignInBodyRequest = Pick<User, "email"> & {
  password: string;
};

export type SignUpBodyRequest = Pick<User, "email" | "username"> & {
  password: string;
};

export type UpdateCurrentUserBodyRequest = Omit<User, "token"> & {
  password: string;
};

interface UserApiResponse {
  user: User;
}
// #endregion

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  signin(user: SignInBodyRequest): Observable<UserApiResponse> {
    return this.apiService.post<UserApiResponse>("users/sign-in", user);
  }

  signup(user: SignUpBodyRequest): Observable<UserApiResponse> {
    return this.apiService.post<UserApiResponse>("users/sign-up", user);
  }

  getCurrentUser(): Observable<UserApiResponse> {
    return this.apiService.get<UserApiResponse>("/user");
  }

  updateCurrentUser(
    user: UpdateCurrentUserBodyRequest
  ): Observable<UserApiResponse> {
    return this.apiService.put<UserApiResponse>("/user", {
      user,
    });
  }

  refreshToken(): Observable<UserApiResponse> {
    return this.apiService.post<UserApiResponse>("refresh-token", {}).pipe(
      catchError((error) => {
        // Handle error (logging, showing error message, etc.)
        throw error;
      })
    );
  }

  revokeToken(): Observable<void> {
    return this.apiService.post<void>("revoke-token", {});
  }
}
