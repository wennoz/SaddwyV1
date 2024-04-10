import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class rolGuard implements CanActivate {
  constructor( private router: Router) { }

  canActivate(): boolean {
    const user = localStorage.getItem('user')
    let usuario: any
    if (user) {
      usuario = JSON.parse(user)
    }
    if (usuario.administrador) {
      return true
    } else {
      this.router.navigate(['/dashboard'])
      return false
    }
  }
}
