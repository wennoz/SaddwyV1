import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class isAuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {
    const token=localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/dashboard']); // Redirige al usuario a la página de dashboard
      return false; // Si el usuario está autenticado,no le permite el acceso a la ruta
    } else {
      return true;
    }
  }
}
