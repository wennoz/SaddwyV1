import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class rolGuard implements CanActivate {
  constructor( private router: Router) { }

  canActivate(): boolean {
    const admin = localStorage.getItem('admin')
    if (admin=='true') {
      return true
    } else {
      this.router.navigate(['/dashboard'])
      return false
    }
  }
}
