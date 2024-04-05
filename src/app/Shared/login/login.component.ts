import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public frmLogin: FormGroup;
  public error=false;
  public incompletos=false;
  public mensaje:any;

  constructor(private authService:AuthService, private router: Router,private toastr: ToastrService){
    this.frmLogin=new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }
  ngOnInit(): void {
    
  }
  login():void{
    let credentials = {
      "correo": this.frmLogin.controls['email'].value,
      "password": this.frmLogin.controls['password'].value
    }
    if (this.frmLogin.invalid) {
      this.incompletos=true;
      return
    }
    this.authService.login(credentials).subscribe(result => {
      let dato=result.dato
      localStorage.setItem('token',dato.acceso)
      localStorage.setItem('refreshToken',dato.actualizar)
      localStorage.setItem("user",JSON.stringify(dato));
      this.router.navigateByUrl('dashboard')
    },
      error => {
        this.mensaje=error.error.mensaje
        this.error=true;
        console.log(error)
      });
    
  }
}
