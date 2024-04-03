import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit{
  barra=false;
  user:any

  constructor(private router: Router) {}
  ngOnInit(): void {
    let usuario=localStorage.getItem('user')
    if (usuario) {
        this.user=JSON.parse(usuario)
    }
  }
  onActivate(event:any) {
    if (event.constructor.name === 'PrincipalComponent') {
      this.barra = true;
    }else{
      this.barra=false;
    }
  }
  loyaut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
  }
}
