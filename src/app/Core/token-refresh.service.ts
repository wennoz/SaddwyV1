import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subscription, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  private refreshSubscription: Subscription | undefined;

  constructor(private http: HttpClient) {}

  startTokenRefresh() {
    // Empezar a enviar el token de refresco cada 5 minutos
    this.refreshSubscription = interval(5 * 60 * 1000) // 5 minutos en milisegundos
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
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>('http://127.0.0.1:8000/api/v01/refresh/', { refreshToken })
    .pipe(
      switchMap((response) => {
        // Guardar el nuevo token en el LocalStorage
        localStorage.setItem('token', response.token);
        // Devolver un observable vacío ya que no necesitamos emitir ningún valor adicional
        return EMPTY;
      })
    );
  }
}
