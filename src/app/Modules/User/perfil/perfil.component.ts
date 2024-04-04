import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChild('abrir') abrir!: ElementRef;
  user:any
  progreso:any=[]
  racha:any
  constructor(private service:UsuarioService){
  }
  ngOnInit(): void {
    let usu=localStorage.getItem('user')
    if (usu) {
      this.user=JSON.parse(usu);
    } 
    this.getProfile();
  }
  getProfile(){
    this.service.getProfile().subscribe(result=>{
      this.user=result.dato.usuario
      this.progreso=result.dato.progreso
      this.racha=this.user.racha
    },error=>{
      console.log(error);
      
    });
  }
  abrirFile(){
    this.abrir.nativeElement.click();
  }

}
