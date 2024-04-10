import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactoAdminService } from 'src/app/Core/contacto-admin.service';

@Component({
  selector: 'app-mensajes-contacto',
  templateUrl: './mensajes-contacto.component.html',
  styleUrls: ['./mensajes-contacto.component.css']
})
export class MensajesContactoComponent implements OnInit{
  listMensajes:any=[]
  mensaje:any
  constructor(private service:ContactoAdminService, private toars:ToastrService){

  }
  ngOnInit(): void {
   this.getAll(); 
  }
  getAll(){
    this.service.getAll().subscribe(result=>{
      console.log(result);
      this.listMensajes=result
    },error=>{
      console.log(error);
      
    })
  }

  ver(id:any){
    this.service.getById(id).subscribe(result=>{
      console.log(result);
      this.mensaje=result
    },error=>{
      console.log(error);
      
    })
  }

  eliminar(id:any){
      this.service.delete(id).subscribe(result=>{
        console.log(result);
        this.getAll();
        this.toars.success('Mensaje eliminado','SaddWy')
      },error=>{
        console.log(error);
        
      })
  }
}
