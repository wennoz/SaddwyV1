import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/Core/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  public frmSingUp: FormGroup;

  ngOnInit(): void {

  }

  constructor(private service: UsuarioService, private toastr: ToastrService) {
    this.frmSingUp = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]),
      correo: new FormControl(null, [Validators.required, Validators.maxLength(254), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      ConfirmarPassword: new FormControl(null, [Validators.required])
    })
  }

  singUp() {
    let name = this.frmSingUp.controls['nombre'].value;
    let email = this.frmSingUp.controls['correo'].value;
    let pass = this.frmSingUp.controls['password'].value;
    let passConfi = this.frmSingUp.controls['ConfirmarPassword'].value;
    
    if (this.frmSingUp.invalid) {
      if (this.frmSingUp.controls['ConfirmarPassword'].hasError('required')) {
        this.toastr.error('La confirmación de la contraseña es obligatoria', 'Confirmar contraseña');
      }

      if (this.frmSingUp.controls['password'].hasError('required')) {
        this.toastr.error('La contraseña es obligatoria', 'Contraseña');
      }
      if (this.frmSingUp.controls['password'].hasError('minlength') || this.frmSingUp.controls['password'].hasError('maxlength')) {
        this.toastr.error('La contraseña debe tener entre 8 y 12 caracteres', 'Contraseña');
      }

      if (this.frmSingUp.controls['correo'].hasError('required')) {
        this.toastr.error('El correo es obligatorio', 'Correo');
      }
      if (this.frmSingUp.controls['correo'].hasError('maxlength')) {
        this.toastr.error('El correo no puede tener más de 254 caracteres', 'Correo');
      }
      if (this.frmSingUp.controls['correo'].hasError('email')) {
        this.toastr.error('El correo electrónico no es válido', 'Correo');
      }

      if (this.frmSingUp.controls['nombre'].hasError('minlength') || this.frmSingUp.controls['nombre'].hasError('maxlength')) {
        this.toastr.error('El nombre debe tener entre 10 y 50 caracteres', 'Nombre');
      }
      if (this.frmSingUp.controls['nombre'].hasError('pattern')) {
        this.toastr.error('El nombre solo puede contener letras y espacios', 'Nombre');
      }
      if (this.frmSingUp.controls['nombre'].hasError('required')) {
        this.toastr.error('El nombre es obligatorio', 'Nombre');
      }
      
      if (name.includes(pass) || email.includes(pass)) {
        this.toastr.error('Evita usar información personal en la contraseña', 'Contraseña');
      }
      return
    }    

    if (passConfi == pass) {
      let data = {
        "nombre": this.frmSingUp.controls['nombre'].value,
        "correo": this.frmSingUp.controls['correo'].value,
        "password": this.frmSingUp.controls['password'].value
      }
      this.service.save(data).subscribe(result => {
        console.log(result);
          this.toastr.success('Bienvenid@, revisa tu correo, hemos enviado un enlace para que inicies sesión. ','SaddWy')
      }, error => {
        console.log(error);

      });
    } else {
      this.toastr.error('Las contraseñas no coinciden', 'Contraseña');
      return
    }
  }
}
