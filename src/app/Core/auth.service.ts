import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, interval, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v01';
  private urlBase = 'http://127.0.0.1:8000/api/v01/refresh/';
  private userData={}
  private httpHeader:HttpHeaders

  constructor(private http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials)
      .pipe(
        tap(res => this.saveToken(res.token)),
        tap(res => this.saveUserData(res.user))
      );
      
  }

  private saveToken(token: string): void {
    localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
  }
  private saveUserData(user: any): void {
    this.userData = user; // Guardar los datos del usuario en el servicio
  }
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Obtener el token almacenado
  }
  getUserData(): any {
    return this.userData;
  }

  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificar si hay un token presente
  }

  refrescar(){
    let data={
      refresh:localStorage.getItem('refreshToken')
    }
    return this.http.post<any>(this.urlBase,data,{headers :this.httpHeader})
  }

  iniciarIntervaloRefresco() {
    // Emite un valor cada 10 minutos (600,000 milisegundos)
    const intervalo$ = interval(500000);

    // Ejecuta el refresco de token cada vez que se emite un valor del intervalo
    intervalo$
      .pipe(
        switchMap(() => this.refrescar()) // Utiliza switchMap para cancelar las solicitudes anteriores si se emite un nuevo valor
      )
      .subscribe(
        (result) => {
          // Manejar el resultado del refresco del token
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.setItem('token', result.access);
          localStorage.setItem('refreshToken', result.refresh);
        },
        (error) => {
          // Manejar errores
          console.error('Error al refrescar el token:', error);
        }
      );
  }
}
