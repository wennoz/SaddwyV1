import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from 'src/app/Core/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent  {

  frmMensaje:FormGroup
  constructor(private service:ContactoService,private toastr:ToastrService){
    this.frmMensaje=new FormGroup({
      nombre: new FormControl(null,[Validators.required]),
      telefono: new FormControl(null,[Validators.required,Validators.minLength(10)]),
      correo: new FormControl(null,[Validators.required]),
      mensaje: new FormControl(null,[Validators.required])
    })
  }

  enviar(){
    if (this.frmMensaje.invalid) {
      this.toastr.error('Completa los campos por favor', 'SaddWy',{ positionClass: 'toast-bottom-right' });
      return
    }
    if (this.frmMensaje.controls['telefono'].hasError('minlength')) {
      this.toastr.error('Debes ingresar un numero valido por favor', 'SaddWy',{ positionClass: 'toast-bottom-right' });
      return
    }
    let formData= new FormData
    formData.append('nombre',this.frmMensaje.controls['nombre'].value)
    formData.append('celular',this.frmMensaje.controls['telefono'].value)
    formData.append('correo',this.frmMensaje.controls['correo'].value)
    formData.append('mensaje',this.frmMensaje.controls['mensaje'].value)
    this.service.save(formData).subscribe(result=>{
      console.log(result); 
      this.toastr.success(result.mensaje,'SaddWy',{ positionClass: 'toast-bottom-right' })
    },error=>{
      this.toastr.error(error.error.mensaje, 'SaddWy',{ positionClass: 'toast-bottom-right' });
      console.log(error);
      
    })
  }
}
