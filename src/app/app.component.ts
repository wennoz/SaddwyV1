import { Component, OnInit } from '@angular/core';
import { AuthService } from './Core/auth.service';
import { LenguajesService } from './Core/lenguajes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SaddWy';
  
  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.iniciarIntervaloRefresco();
  }

}
