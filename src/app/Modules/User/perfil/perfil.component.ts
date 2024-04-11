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
    this.getProfile();
  }
  getProfile(){
    this.service.getProfile().subscribe(result=>{
      this.user=result.dato.usuario
      this.nombre=this.user.nombre
      this.progreso=result.dato.progreso
      this.racha=this.user.racha
    },error=>{
      console.log(error);
      
    });
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
  cambiarFoto(){
    let fotoInput = document.getElementById('fotoInput') as HTMLInputElement;
    let foto: File | null = null;
    if (fotoInput && fotoInput.files && fotoInput.files.length > 0) {
      foto = fotoInput.files[0];
    }
    let formData = new FormData();
    if (foto) {
      formData.append('foto', foto);
      formData.append('nombre', this.nombre);
      this.service.edit(formData).subscribe(result=>{
        console.log(result);
        this.getProfile();
        this.toars.success('Foto agregada', 'SaddWy')
      }, error=>{
        console.log(error);
        
      });
    }
  }
  

}
