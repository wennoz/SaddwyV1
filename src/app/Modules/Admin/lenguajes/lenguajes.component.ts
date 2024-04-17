import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LenguajesAdminService } from 'src/app/Core/lenguajes-admin.service';

@Component({
  selector: 'app-lenguajes',
  templateUrl: './lenguajes.component.html',
  styleUrls: ['./lenguajes.component.css']
})
export class LenguajesComponent implements OnInit {
  listLenguajes: any = []
  idGlobal = 0
  editar=false
  frmLenguaje: FormGroup;
  @ViewChild('modalButton') modalButton!: ElementRef;

  constructor(private service: LenguajesAdminService, private toars: ToastrService) {
    this.frmLenguaje = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      fondo: new FormControl(null, [Validators.required]),
      componente: new FormControl(null, [Validators.required]),
      urlDocumentation: new FormControl(null, [Validators.required]),
      // logo: new FormControl(null, [Validators.required])
    })
  }


  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.service.getAll().subscribe(result => {
      this.listLenguajes = result
    },
      error => {
        console.log(error);

      })
  }

  agregar(){
    this.editar=false;
    this.frmLenguaje.controls['nombre'].setValue(''); // Corrección aquí
    this.frmLenguaje.controls['urlDocumentation'].setValue(''); // Completa los otros campos
    this.frmLenguaje.controls['fondo'].setValue('');
    this.frmLenguaje.controls['componente'].setValue('');
   
  }

  agregarLenguaje() {
    // Obtener el archivo seleccionado
    let logoInput = document.getElementById('logoInput') as HTMLInputElement;
    let logo: File | null = null;
    if (logoInput && logoInput.files && logoInput.files.length > 0) {
      logo = logoInput.files[0];
    }
    // Crear objeto FormData
    let formData = new FormData();
    formData.append('urlDocumentation', this.frmLenguaje.controls['urlDocumentation'].value);
    if (logo) {
      formData.append('logo', logo);
    }
    let color = {
      fondo: this.frmLenguaje.controls['fondo'].value,
      componente: this.frmLenguaje.controls['componente'].value
    }
    let colorString = JSON.stringify(color);
    formData.append('color', colorString)
    formData.append('nombre', this.frmLenguaje.controls['nombre'].value);
    formData.append('estado', 'true');
    // Enviar formulario al servidor
    this.service.save(formData).subscribe(result => {
      console.log(result);
      this.toars.success('Lenguaje creado correctamente', 'SaddWy')
      this.getAll();
    }, error => {
      console.log(error);
    });
  }



  tomarId(id: any) {
    this.idGlobal = id;
  
  }
  eliminar() {
    this.service.delete(this.idGlobal).subscribe(result => {
      console.log(result);
      this.getAll();
      this.toars.success('Lenguaje eliminado', 'SaddWy')
    }, error => {
      console.log(error);

    });
  }

  verLenguajes(id: any) {
    this.editar=true
    
    this.idGlobal = id;
    this.service.getById(id).subscribe(result => {
      this.frmLenguaje.controls['nombre'].setValue(result.nombre); // Corrección aquí
      this.frmLenguaje.controls['urlDocumentation'].setValue(result.urlDocumentation); // Completa los otros campos
      this.frmLenguaje.controls['fondo'].setValue(result.color.fondo);
      this.frmLenguaje.controls['componente'].setValue(result.color.componente);
    }, error => {
      console.log(error);

    })
  }
  mostrarAgregar(){
    this.editar=false
  }
  editarLenguaje() {
    let logoInput = document.getElementById('logoInput') as HTMLInputElement;
    let logo: File | null = null;
    if (logoInput && logoInput.files && logoInput.files.length > 0) {
      logo = logoInput.files[0];
    }
    // Crear objeto FormData
    let formData = new FormData();
    formData.append('urlDocumentation', this.frmLenguaje.controls['urlDocumentation'].value);
    if (logo) {
      formData.append('logo', logo);
    }
    let color = {
      fondo: this.frmLenguaje.controls['fondo'].value,
      componente: this.frmLenguaje.controls['componente'].value
    }
    let colorString = JSON.stringify(color);
    formData.append('color', colorString)
    formData.append('nombre', this.frmLenguaje.controls['nombre'].value);
    formData.append('estado', 'true');

    this.service.editar(formData, this.idGlobal).subscribe(result => {
      this.toars.success('Lenguaje editado', 'SaddWy')
      this.getAll()
    },
      error => {
        console.log(error);
        
      })
  }
}
