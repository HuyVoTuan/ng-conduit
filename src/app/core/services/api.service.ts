import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, timeout } from "rxjs/operators";
import { APP_API_TIMEOUT, APP_API_URL } from "@app/core/constants/app.constant";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // GET Request
  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.get<T>(`${APP_API_URL}/${url}`, { params, headers }).pipe(
      timeout(APP_API_TIMEOUT),
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // POST Request
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${APP_API_URL}/${url}`, body, { headers }).pipe(
      timeout(APP_API_TIMEOUT),
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // PUT Request
  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${APP_API_URL}/${url}`, body, { headers }).pipe(
      timeout(APP_API_TIMEOUT),
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // DELETE Request
  delete<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.delete<T>(`${APP_API_URL}/${url}`, { params, headers }).pipe(
      timeout(APP_API_TIMEOUT),
      map((response) => response),
      catchError(this.handleError)
    );
  }

  // Handle HTTP Errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
