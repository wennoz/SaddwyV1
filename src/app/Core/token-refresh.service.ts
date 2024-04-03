import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subscription, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  private refreshSubscription: Subscription | undefined;
  private httpHeader:HttpHeaders
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
  }

  startTokenRefresh() {
    // Empezar a enviar el token de refresco cada 5 minutos
    this.refreshSubscription = interval(1 * 10 * 1000) // 5 minutos en milisegundos 5 * 60 * 1000
      .pipe(
        switchMap(() => this.refreshToken())
      )
      .subscribe();
  }

  stopTokenRefresh() {
    // Detener la actualización del token
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private refreshToken() {
    const refreshToken = {
      refresh:localStorage.getItem('refreshToken')
    }
    return this.http.post<any>('http://127.0.0.1:8000/api/v01/refresh/', { refreshToken },{headers :this.httpHeader})
    .pipe(
      switchMap((response) => {
      localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.setItem('token', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        alert('respuesta')
        console.log(response);   
        return EMPTY;
      })
    );
  }
}
