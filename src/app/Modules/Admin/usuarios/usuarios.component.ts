import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosAdminService } from 'src/app/Core/usuarios-admin.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listUser: any = []
  idGlobal = 0
  usuario: any = {}
  nombre:string='';
  admin=''
  constructor(private service: UsuariosAdminService, private toars: ToastrService) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(result => {
      this.listUser = result;
    },
      error => {
        console.log(error);
      });
  }

  eliminar() {
    this.service.delete(this.idGlobal).subscribe(result => {
      console.log(result);
      this.getAll();
      this.toars.success('Usuario eliminado', 'SaddWy')
    }, error => {
      console.log(error);

    });
  }

  tomarId(id: any) {
    this.idGlobal = id;
  }

  getUser(id: any) {
    this.idGlobal=id
    this.service.getById(id).subscribe(result => {
      this.usuario = result
      console.log(this.usuario);
      
    }, error => {
      console.log(error);

    })
  }

  editar() {
    let administrador
    if (this.admin=='1') {
      administrador=true
    }else{
      administrador=false
    }
   let data={
    administrador:administrador
   }
   console.log(data);
   
    this.service.editar(data, this.idGlobal).subscribe(result => {
      this.toars.success('Rol del usuario editado', 'SaddWy',{ positionClass: 'toast-bottom-right' })
      console.log(result);
      this.getAll()
    },
      error => {
        console.log(error);
        
      });
  }
}
