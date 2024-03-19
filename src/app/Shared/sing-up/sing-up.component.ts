import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  public frmSingUp: FormGroup;

  ngOnInit(): void {
    
  }

  constructor(private service:UsuarioService){
    this.frmSingUp=new FormGroup({
      nombre:new FormControl(null, [Validators.required]),
      correo:new FormControl(null, [Validators.required]),
      password:new FormControl(null, [Validators.required]),
      ConfirmarPassword:new FormControl(null, [Validators.required]),
    })
  }

  singUp(){
 
    if (this.frmSingUp.invalid) {
        alert('Complete los datos') 
        return
    }
    let pass=this.frmSingUp.controls['password'].value;
    let passConfi=this.frmSingUp.controls['ConfirmarPassword'].value;
    if (passConfi==pass) {
      alert('correcto')
      let data={
        "nombre": this.frmSingUp.controls['nombre'].value,
        "correo": this.frmSingUp.controls['correo'].value,
        "password":this.frmSingUp.controls['password'].value
      }
      this.service.save(data).subscribe(result=>{
      console.log(result);
      
      },error=>{
        console.log(error);
        
      });
           
    }else{
      alert('la contraseña no son igules')
      return
    }

  }


}
