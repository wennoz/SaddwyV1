import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChild('abrir') abrir!: ElementRef;
  user:any
  constructor(){
  }
  ngOnInit(): void {
    let usu=localStorage.getItem('user')
    if (usu) {
      this.user=JSON.parse(usu);
    }
    console.log(this.user);
    
  }
  abrirFile(){
    this.abrir.nativeElement.click();
  }

}
