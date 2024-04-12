import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  visible: boolean = true;
  changetype: boolean = true;
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this. changetype;
  }


  public frmLogin: FormGroup;
  public error = false;
  public incompletos = false;
  public mensaje: any;
  token = ''
  constructor(private authService: AuthService,
    private router: Router,
    private activaRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.frmLogin = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
    this.activaRoute.snapshot.params['token'];
  }
  ngOnInit(): void {
    this.token = this.activaRoute.snapshot.params['token'];
  }
  login(): void {
    if (this.token == undefined) {
      let credentials = {
        "correo": this.frmLogin.controls['email'].value,
        "password": this.frmLogin.controls['password'].value
      }
      if (this.frmLogin.invalid) {
        this.incompletos = true;
        return
      }
      this.authService.login(credentials).subscribe(result => {
        console.log(result.dato.administrador);
        
        let dato = result.dato
        localStorage.setItem('token', dato.acceso)
        localStorage.setItem('refreshToken', dato.actualizar)
        localStorage.setItem("admin", result.dato.administrador);

        if (result.dato.administrador==true) {
          this.router.navigateByUrl('admin')
        } else {
          this.router.navigateByUrl('dashboard')
        }
      },
        error => {
          this.mensaje = error.error.mensaje
          this.error = true;
          console.log(error)
        });

    } else {
      this.authService.validarCuenta(this.token).subscribe(result => {
        let credentials = {
          "correo": this.frmLogin.controls['email'].value,
          "password": this.frmLogin.controls['password'].value
        }
        if (this.frmLogin.invalid) {
          this.incompletos = true;
          return
        }
        this.authService.login(credentials).subscribe(result => {
          let dato = result.dato
          localStorage.setItem('token', dato.acceso)
          localStorage.setItem('refreshToken', dato.actualizar)
          localStorage.setItem("admin", result.dato.administrador);
        
        if (result.dato.administrador==true) {
          this.router.navigateByUrl('admin')
        } else {
          this.router.navigateByUrl('dashboard')
        }
        },
          error => {
            this.mensaje = error.error.mensaje
            this.error = true;
            console.log(error)
          });
      }, error => {
        this.toastr.error(error.error.mensaje,'SaddWy')
        console.log(error);

      });
    }

  }
}
