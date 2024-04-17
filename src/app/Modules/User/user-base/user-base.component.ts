import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { LenguajesService } from 'src/app/Core/lenguajes.service';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit{
  barra=false;
  user:any
  listLenguajes:any=[]
  filtro:any=[]
  buscador=''
  admin:boolean=false
  constructor( private serviseUser:UsuarioService, private service:LenguajesService,private router: Router, private authService:AuthService) {}
  saibar=true
  elementoActivo: string = 'inicio';
  ngOnInit(): void {
    this.getProfil();
    this.getLenguajes();
    this.serviseUser.perfil$.subscribe(perfil => {
      this.user = perfil;
    });
    if (localStorage.getItem('admin')=='false') {
      this.admin=false
    }else{
      this.admin=true
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
    this.authService.detenerIntervalo();
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
  }

  getProfil(){
    this.serviseUser.getProfile().subscribe(result=>{
      this.user=result.dato.usuario
    },error=> {
      console.log(error);
      
    })
  }
  getLenguajes(){
    this.service.getAll().subscribe(result=>{
      this.listLenguajes=result.dato
    },error=>{
      console.log(error);
    })
  }
  buscar(event: Event) {
    const letras = (event.target as HTMLInputElement).value; // Verificación de nulidad
    if (letras) {
      this.filtro = this.listLenguajes.filter((objeto:any) =>
        objeto.nombre.toLowerCase().includes(letras.toLowerCase())
      );
    } else {
      this.filtro = []; // Si el campo de búsqueda está vacío, reinicia los resultados
    }
  }
  verNiveles(nombre: any) {
    this.router.navigateByUrl('/dashboard/nivel/'+nombre)
  }
  ocultarResultados(){
    setTimeout(()=>{
      this.filtro=[]
      this.buscador=''
    },200);
  }
  mostrar(){
    this.saibar=!this.saibar
  }
  marcarActivo(elemento: string) {
    this.elementoActivo = elemento;
  }
}
