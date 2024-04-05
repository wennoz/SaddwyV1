import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  formCorreo:FormGroup;

  constructor(private service: AuthService, private toars: ToastrService) {
    this.formCorreo=new FormGroup({
      correo:new FormControl(null,[Validators.required])
    })
   }

  recuperar() {
    if (this.formCorreo.invalid) {
      this.toars.error('Debes escribir tu correo electrónico', 'SaddWy')
      return
    }
    let data = {
      correo: this.formCorreo.controls['correo'].value
    }
    this.service.recuperar(data).subscribe(result => {
      console.log(result)
      this.toars.success('Por favor revisa tu correo electrónico para restablecer tu contraseña', 'SaddWy')
    }, error => {
      console.log(error);
      this.toars.error(error.error.mensaje,'SaddWy')

    })
  }
}
