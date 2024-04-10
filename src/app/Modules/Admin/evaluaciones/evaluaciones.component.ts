import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NivelesService } from 'src/app/Core/niveles.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit{
        listNiveles:any=[]
        idGlobal=0
        terminoBusqueda=''
        ngOnInit(): void {
          this.getAll();
         
          
        }

        constructor(private service:NivelesService,private router:Router,private toastr:ToastrService){

        }

        getAll(){
          // observables = "SUBSCRIBE" esperar a que se cumpla un acción,nos estamos subscribiendo al observable que retorna lo que devuelve la api 
          this.terminoBusqueda=''
          this.service.getAll().subscribe(response=>{
            this.listNiveles=response
            console.log(this.listNiveles);
            
          },
          error=>{
            console.log(error);
            
          })
        }
        editar(id:any){
          this.router.navigateByUrl('admin/editar/niveles/'+id)
        }

        tomarId(id:any){
          this.idGlobal=id;
        }
        eliminar(){
          this.service.delete(this.idGlobal).subscribe(result=>{
            this.getAll()
            this.toastr.error('Nivel eliminado correctamente', 'SaddWy');
          },error=>{
            console.log(error);
            
          })
        }
        buscar() {
          if (this.terminoBusqueda.trim() === '') {
            this.listNiveles = this.listNiveles;
          } else {
            const terminoMinusculas = this.terminoBusqueda.toLowerCase().trim();
            this.listNiveles = this.listNiveles.filter((nivel:any) =>
              nivel.nombre.toLowerCase().includes(terminoMinusculas) ||
              nivel.explanation.toLowerCase().includes(terminoMinusculas)
            );
          }
        }
}
