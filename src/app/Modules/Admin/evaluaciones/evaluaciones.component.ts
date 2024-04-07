import { Component, OnInit } from '@angular/core';
import { NivelesService } from 'src/app/Core/niveles.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit{
        listNiveles:any=[]
        ngOnInit(): void {
          this.getAll();
        }

        constructor(private service:NivelesService){

        }

        getAll(){
          // observables = "SUBSCRIBE" esperar a que se cumpla un acción,nos estamos subscribiendo al observable que retorna lo que devuelve la api 
          this.service.getAll().subscribe(response=>{
            console.log(response);
            this.listNiveles=response
          },
          error=>{
            console.log(error);
            
          })
        }
}
