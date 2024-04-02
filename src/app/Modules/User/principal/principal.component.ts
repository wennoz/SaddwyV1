import { Component, OnInit } from '@angular/core';
import { LenguajesService } from 'src/app/Core/lenguajes.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  listLenguajes=[]

  ngOnInit(): void {
    this.getAll()
  }
  constructor(private service:LenguajesService){}

  getAll(){
    this.service.getAll().subscribe(result=>{
      console.log(result);
    },
    error=>{
      console.log(error);
      
    })
  }
}
