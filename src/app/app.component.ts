import { Component, OnInit } from '@angular/core';
import { AuthService } from './Core/auth.service';
import { LenguajesService } from './Core/lenguajes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //inyectar el servico de autenticación donde esta el metodo de refrescar el token 
  constructor(private auth:AuthService){}

  //este es el metodo/funcion que se ejecuta siempre apenas se abre este componente
  ngOnInit(): void {
    // this.auth.iniciarIntervaloRefresco();
  }

}
