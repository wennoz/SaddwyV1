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
  visible : boolean = true
  changetype: boolean = true
  password=''
  confiPassword=''
  changetype2:boolean=false
  token=''
  visible2:boolean=true
  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private activeRoute:ActivatedRoute,
    private router:Router 
  ){}
  
   viewpass(){
    this.visible = !this.visible
    this.changetype = !this.changetype
   }
   viewpass2(){
    this.visible2 = !this.visible2
    this.changetype2=!this.changetype2
   }
  ngOnInit(): void {
    this.token=this.activeRoute.snapshot.params['token'];
  }

  restablecer(){
      if (this.password==''||this.confiPassword=='') {
        this.toastr.error('Los campos no pueden estar vacíos','SaddWy');
        return
      }
      if (this.password!=this.confiPassword) {
        this.toastr.error('Oops, parece que las contraseñas que ingresaste no coinciden. Por favor, inténtalo de nuevo.','SaddWy')
      }else{
        let data={
          password:this.password
        }
        this.authService.restablecer(data,this.token).subscribe(result=>{
          this.toastr.success('La contraseña fue restablecida, ya puedes volver a ingresar y seguir aprendiendo','SaddWy')
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
