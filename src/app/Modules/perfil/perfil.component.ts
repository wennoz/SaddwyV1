import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
   user:any

  constructor(){

  }
  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    
    let usu=localStorage.getItem('user')
    if (usu) {
      this.user=JSON.parse(usu);
    }
    console.log(this.user);
    
  }

}
