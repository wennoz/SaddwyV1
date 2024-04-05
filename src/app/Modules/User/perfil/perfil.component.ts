import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user:any
  progreso:any=[]
  racha:any
  foto:any
  nombre:any
  frmPass:FormGroup
  constructor(private service:UsuarioService, private toars:ToastrService){
    this.frmPass=new FormGroup({
      password:new FormControl(null,[Validators.required]),
      ConfiPassword:new FormControl(null,[Validators.required])
    })
  }
  ngOnInit(): void {
    let usu=localStorage.getItem('user')
    if (usu) {
      let userLocal=JSON.parse(usu);
      this.nombre=userLocal.nombre 
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
  editar(){
    let data={
      foto:'',
      nombre:this.nombre,
      password:''
    }
    if (this.nombre=='') {
      this.toars.error('Tiene que haber al menos un campo', 'SaddWy')
      return
    }else{
      this.service.edit(data).subscribe(result=>{
        this.toars.success('Información actualizada', 'SaddWy')
        this.getProfile()
      },
      error=>{
        console.log(error);
        
      })
    }
  }

  cambiar(){
    if (this.frmPass.invalid) {
      this.toars.error('Debes completar los campos', 'SaddWy')
      return
    }
    if (this.frmPass.controls['ConfiPassword'].value!=this.frmPass.controls['password'].value) {
      this.toars.error('Los datos no coinciden', 'SaddWy')
      return
    }
    let data={
      foto:'',
      nombre:this.nombre,
      password:this.frmPass.controls['password'].value
    }
    this.service.edit(data).subscribe(result=>{
      this.toars.success('Contraseña actualizada', 'SaddWy')
    },
    error=>{
      console.log(error);
      
    });
    
  }
  onFileSelected(event: any) {
    this.foto = event.target.files[0];  
  }

}
