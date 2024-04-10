import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LenguajesService } from 'src/app/Core/lenguajes.service';
import { NivelesService } from 'src/app/Core/niveles.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {
  listNiveles:any=[]
  nombre=''
  lenguajeObject:any
  constructor(private service:LenguajesService,
              private activeRoute:ActivatedRoute,
              private router:Router
  ){}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params['nivel']=='C') {
      this.nombre='C#'
    }else{
      this.nombre=this.activeRoute.snapshot.params['nivel'];
    }
    console.log(this.nombre);
    this.getAll();
  }
  getAll(){
    this.service.getAll().subscribe(result=>{
      let niveles:any[]=result.dato
      niveles.forEach(nivel => {
        if (nivel.nombre==this.nombre) {
          this.lenguajeObject=nivel
          this.listNiveles=nivel.niveles
        }
      });
    },error=>{
      console.log(error);
      
    })
  }
  verNivel(id: any) {
    this.router.navigateByUrl('pregunta/' + id)
  }

}
