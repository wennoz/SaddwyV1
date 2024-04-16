import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
  user:any
  elementoActivo: string = 'niveles';
  saibar=true
  constructor( private serviseUser:UsuarioService) {}

  ngOnInit(): void {
   this.getProfile() ;
  }
  getProfile(){
    this.serviseUser.getProfile().subscribe(result=>{
      this.user=result.dato.usuario
    },error=> {
      console.log(error);
      
    })
  }
  marcarActivo(elemento: string) {
    this.elementoActivo = elemento;
    this.mostrar()
  }
  layaut(){
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('admin')
  }
  mostrar(){
    this.saibar=!this.saibar
  }
}
