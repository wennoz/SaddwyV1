import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';
import { TokenRefreshService } from 'src/app/Core/token-refresh.service';
 
@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit{
  ocultar=true
  user:any
  mostrar(){
    this.ocultar=!this.ocultar
  }
  ngOnInit(): void {
    let data=localStorage.getItem('user');
    if (data) {
      let usu=JSON.parse(data)
      this.user=usu.usuario
    }
  }
  constructor(private auth:AuthService,private refresh:TokenRefreshService){}

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
    this.auth.logout()
    this.refresh.stopTokenRefresh();
  }
}
