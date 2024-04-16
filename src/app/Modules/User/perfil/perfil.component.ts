import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any
  progreso: any = []
  racha: any
  foto: any
  nombre: any
  frmPass: FormGroup
  constructor(private service: UsuarioService, private toars: ToastrService) {
    this.frmPass = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      ConfiPassword: new FormControl(null, [Validators.required])
    })
  }
  ngOnInit(): void {
    this.getProfile();
  }


  validPass(): boolean {
    const password = this.frmPass.controls['password'].value;
    if (!/[A-Z]/.test(password)) {
      this.toars.error('La contraseña debe contener al menos una letra mayuscula', 'SaddWy', { positionClass: 'toast-bottom-right' })
      return false
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      this.toars.error('La contraseña debe contener un caracter especial', 'SaddWy', { positionClass: 'toast-bottom-right' })
      return false
    }

    if (!/\d/.test(password)) {
      this.toars.error('La contraseña debe contener al menos numero', 'SaddWy', { positionClass: 'toast-bottom-right' })
      return false
    }

    if (password.length < 8) {
      this.toars.error('La contraseña tiene que tener mas de 8 caracteres', 'SaddWy', { positionClass: 'toast-bottom-right' })
      return false
    }
    return true
  }
  getProfile() {
    this.service.getProfile().subscribe(result => {
      console.log(result);
      
      this.service.actualizar(result.dato.usuario);
      this.user = result.dato.usuario
      this.nombre = this.user.nombre
      this.progreso = result.dato.progreso
      this.racha = this.user.racha
    }, error => {
      console.log(error);

    });
  }

  cambiar() {
    if (this.frmPass.invalid) {
      this.toars.error('Debes completar los campos', 'SaddWy')
      return
    }
    if (this.frmPass.controls['ConfiPassword'].value != this.frmPass.controls['password'].value) {
      this.toars.error('La contraseña coinciden', 'SaddWy')
      return
    }
    if (this.validPass()) {
      let data = {
        nombre: this.nombre,
        password: this.frmPass.controls['password'].value
      }
      this.service.edit(data).subscribe(result => {
        this.getProfile()
        this.toars.success('Contraseña actualizada', 'SaddWy')
      },
        error => {
          console.log(error);

        });
    }

  }
  cambiarFoto() {
    let fotoInput = document.getElementById('fotoInput') as HTMLInputElement;
    let foto: File | null = null;
    if (fotoInput && fotoInput.files && fotoInput.files.length > 0) {
      foto = fotoInput.files[0];
    }
    let formData = new FormData();
    if (foto) {
        formData.append('foto', foto);
        this.service.edit(formData).subscribe(result => {
          console.log(result);
          this.getProfile();
          this.toars.success('Foto agregada', 'SaddWy', { positionClass: 'toast-bottom-right' })
        }, error => {
          this.toars.error(error.error.mensaje, 'Saddwy', { positionClass: 'toast-bottom-right' })
        });
    }
  }

  cambiarNombre(){
    let formData = new FormData();
    if (this.nombre.length > 10 && this.nombre.length < 30) {
      formData.append('nombre', this.nombre);
      this.service.edit(formData).subscribe(result => {
        console.log(result);
        this.getProfile();
        this.toars.success('Nombre actualizado', 'SaddWy', { positionClass: 'toast-bottom-right' })
      }, error => {
        this.toars.error(error.error.mensaje, 'Saddwy', { positionClass: 'toast-bottom-right' })
      });
    }else{
      this.toars.error('El nombre debe tener minimo 10 caracteres y maximo 30','SaddWy')
    }
  }


}
