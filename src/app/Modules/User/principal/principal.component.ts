import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { LenguajesService } from 'src/app/Core/lenguajes.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  listLenguaje:any=[]

  constructor(private service:LenguajesService, private router:Router, private auth:AuthService){}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(result=>{
      this.listLenguaje=result.dato
    },
    error=>{
      console.log(error);
    })
  }

  verNivel(id:any){
    this.router.navigateByUrl('pregunta/' + id)
  }

}
