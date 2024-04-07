import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FotosService } from 'src/app/Core/fotos.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit{
  listFotos:any=[]
  idGlobal=0
  mostrarEditar=false
  constructor(private service:FotosService, private toars:ToastrService){}

  ngOnInit(): void {
    this.getAll()
  }

  
  getAll() {
    this.service.getAll().subscribe(result => {
    this.listFotos=result;
    },
      error => {
        console.log(error);

      })
  }
  agregarFoto(){
    let fotoInput = document.getElementById('fotoInput') as HTMLInputElement;
    let foto: File | null = null;
    if (fotoInput && fotoInput.files && fotoInput.files.length > 0) {
      foto = fotoInput.files[0];
    }
    let formData = new FormData();
    if (foto) {
      formData.append('foto', foto);
      this.service.save(formData).subscribe(result=>{
        this.getAll();
        this.toars.success('Foto agregada', 'SaddWy')
      }, error=>{
        console.log(error);
        
      });
    }else{
      this.toars.error('El campo no debe estar vacio', 'SaddWy')
    }
  }
  tomarId(id:any){
    this.idGlobal=id
  }
  mostrarAgregar(){
    this.mostrarEditar=false
  }
  mostrarEditarF(id:any){
    this.mostrarEditar=true
    this.idGlobal=id
  }
  editarFoto(){
    let fotoInput = document.getElementById('fotoInput') as HTMLInputElement;
    let foto: File | null = null;
    if (fotoInput && fotoInput.files && fotoInput.files.length > 0) {
      foto = fotoInput.files[0];
    }
    let formData = new FormData();
    if (foto) {
      formData.append('foto', foto);
      this.service.editar(formData,this.idGlobal).subscribe(result=>{
        this.getAll();
        this.toars.success('Foto editada', 'SaddWy')
      },error=>{
        console.log(error);
        
      });
    }else{
      this.toars.error('El campo no debe estar vacio', 'SaddWy')
    }
  }
  eliminar() {
    this.service.delete(this.idGlobal).subscribe(result => {
      this.getAll();
      this.toars.success('Foto eliminada', 'SaddWy')
    }, error => {
      console.log(error);

    });
  }
}
