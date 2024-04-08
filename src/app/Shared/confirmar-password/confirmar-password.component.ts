import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-confirmar-password',
  templateUrl: './confirmar-password.component.html',
  styleUrls: ['./confirmar-password.component.css']
})
export class ConfirmarPasswordComponent implements OnInit{
  password=''
  confiPassword=''
  token=''
  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private activeRoute:ActivatedRoute,
    private router:Router 
  ){

  }
  ngOnInit(): void {
    this.token=this.activeRoute.snapshot.params['token'];
  }

  restablecer(){
      if (this.password==''||this.confiPassword=='') {
        this.toastr.error('Los campos no pueden estar vacios','SaddWy');
        return
      }
      if (this.password!=this.confiPassword) {
        this.toastr.error('Oops, parece que las contraseñas que ingresaste no coinciden. Por favor, inténtalo de nuevo.','SaddWy')
      }else{
        let data={
          password:this.password
        }
        this.authService.restablecer(data,this.token).subscribe(result=>{
          this.toastr.success('La contraseña fue restablacida, ya puedes volver a ingresar y seguir aprendiendo','SaddWy')
          setTimeout(() => {
            // Aquí puedes especificar la ruta a la que deseas navegar
            this.router.navigate(['/login']);
          }, 2000);
        },error=>{
          console.log(error);
          
        })
      }
  }
}
