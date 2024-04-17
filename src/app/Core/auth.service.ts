import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, Subscription, interval, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://77.37.63.223:8000/api/v01';
  private urlBase = 'http://77.37.63.223:8000/api/v01/';
  private userData={}
  private httpHeader:HttpHeaders
  private intervalo$!: Subscription;

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
  validarCuenta(token:any){
    return this.http.get<any>(this.urlBase+'validate/'+token,{headers :this.httpHeader})  
  }

  recuperar(data:any){
    return this.http.post<any>(this.urlBase+'recovery/',data,{headers :this.httpHeader})
  }
  restablecer(data:any,token:any){
    return this.http.post<any>(this.urlBase+'recover/'+token+'/',data,{headers :this.httpHeader})
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
    console.log('Empieza el refresco');
    
    return this.http.post<any>(this.urlBase+'refresh/',data,{headers :this.httpHeader})
  }

   iniciarIntervaloRefresco() {
    const savedInterval = localStorage.getItem('refreshInterval');
    let intervaloInicial: number;

    if (savedInterval) {
      intervaloInicial = parseInt(savedInterval);
    } else {
      intervaloInicial = 400000; // Valor predeterminado de 5 minutos
    }

    this.intervalo$ = interval(intervaloInicial)
      .pipe(
        switchMap(() => {
          // Guardar el intervalo restante en el almacenamiento local
          this.guardarIntervaloRestanteEnLocalStorage(intervaloInicial);
          return this.refrescar();
        })
      )
      .subscribe(
        (result) => {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.setItem('token', result.access);
          localStorage.setItem('refreshToken', result.refresh);
        },
        (error) => {
          // Manejar errores
          console.error('Error al refrescar el token:', error);
        }
      );
}

private guardarIntervaloRestanteEnLocalStorage(intervalo: number) {
    const tiempoTranscurrido = performance.now() % intervalo;
    const tiempoRestante = intervalo - tiempoTranscurrido;
    localStorage.setItem('refreshInterval', tiempoRestante.toString());
}

  detenerIntervalo() {
    if (this.intervalo$) {
      localStorage.removeItem('refreshInterval')
      this.intervalo$.unsubscribe();
    }
  }
}
