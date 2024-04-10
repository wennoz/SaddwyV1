import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
  user:any
  constructor( private serviseUser:UsuarioService) {}

  ngOnInit(): void {
   this.getProfile() ;
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
