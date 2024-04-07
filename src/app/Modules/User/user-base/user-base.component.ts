import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit{
  barra=false;
  user:any

  constructor(private router: Router, private serviseUser:UsuarioService) {}
  ngOnInit(): void {
    this.getProfile();
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

  getProfile(){
    this.serviseUser.getProfile().subscribe(result=>{
      console.log(result.dato.usuario);
      this.user=result.dato.usuario
    },error=> {
      console.log(error);
      
    })
  }
}
