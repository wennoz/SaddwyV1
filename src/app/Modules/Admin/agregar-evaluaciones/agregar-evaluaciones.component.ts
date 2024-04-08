import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LenguajesAdminService } from 'src/app/Core/lenguajes-admin.service';
import { NivelesService } from 'src/app/Core/niveles.service';
import { PreguntasAdminService } from 'src/app/Core/preguntas-admin.service';

@Component({
  selector: 'app-agregar-evaluaciones',
  templateUrl: './agregar-evaluaciones.component.html',
  styleUrls: ['./agregar-evaluaciones.component.css']
})
export class AgregarEvaluacionesComponent implements OnInit {
  respuestas: { respuesta: string, correcta: boolean }[] = [{ respuesta: '', correcta: false }];
  tituloPregunta: string = ''
  enunciado: string = ''
  nombreNivel: string = ''
  expliacion: string = ''
  lenguaje = ''
  listPreguntas: any = []
  editar = false;
  position = -1;
  listLenguajes: any = []
  idGlobal = 0
  id = 0
  constructor(private toastr: ToastrService,
    private serviceLenguaje: LenguajesAdminService,
    private serviceNivel: NivelesService,
    private activaRoute: ActivatedRoute,
    private router:Router,
    private servicePregunta: PreguntasAdminService
  ) {
    this.activaRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getLenguajes();
    this.id = this.activaRoute.snapshot.params['id'];
    if (this.id != 0) {
      this.serviceNivel.getById(this.id).subscribe(result => {
        this.nombreNivel = result.nombre
        this.expliacion = result.explanation
        this.lenguaje = result.lenguaje
        this.getPreguntas(result.id)
      }, error => {
        console.log(error);

      })
    }

  }
  getPreguntas(id: any) {
    this.servicePregunta.getAll().subscribe(result => {
      let todas: any[] = result
      let filtradas: any = []
      todas.forEach(element => {
        if (element.nivel == id) {
          filtradas.push(element)
        }
      });
      this.ordenraPreguntas(filtradas);
    }, error => {
      console.log(error);

    });
  }

  ordenarRespuestas(res: any): any {
    let listRespuestas: any = [];
    let correcta = res[res.length - 1]; // Obtener la respuesta correcta del arreglo
    for (let i = 0; i < res.length - 1; i++) {
      let respuesta = { respuesta: res[i], correcta: res[i] === correcta };
      listRespuestas.push(respuesta);
    }
    return listRespuestas;
  }
  ordenraPreguntas(preguntas:any[]){
    preguntas.forEach(pregunta => {
        let newPregunta={
          id:pregunta.id,
          nombre:pregunta.pregunta,
          respuestas:this.ordenarRespuestas(Object.values(pregunta.respuesta)),
          enunciado:pregunta.explanation
        }
        this.listPreguntas.push(newPregunta);
    });
    
  }
  getLenguajes() {
    this.serviceLenguaje.getAll().subscribe(result => {
      this.listLenguajes = result

    }, error => {
      console.log(error);

    })
  }
  agregarRespuesta() {
    this.respuestas.push({ respuesta: '', correcta: false });
  }

  eliminarRespuesta(i: any) {
    this.respuestas.splice(i, 1)
  }
  agregarPregunta() {
    if (this.validacion()) {
      if (this.validacionCorrectas()) {
        let copiaRespuestas = []
        copiaRespuestas = this.respuestas.slice();
        let pregunta = {
          nombre: this.tituloPregunta,
          respuestas: copiaRespuestas,
          enunciado: this.enunciado
        }
        this.listPreguntas.push(pregunta);
        this.limpiar()
      }
    }
  }
  eliminarPregunta(i: any,id:any) {
    if (id==undefined) {
      this.listPreguntas.splice(i, 1)
    } else {
      this.servicePregunta.delete(id).subscribe(result=>{
        console.log(result);
        this.getLenguajes();
        this.toastr.error('Pregunta eliminada correctamente de la base de datos','SaddWy')
      },error=>{
        console.log(error);
        
      })
    }
  }
  ver(i: any) {
    this.position = i;
    let pregunta = this.listPreguntas[i]  //guardando una sola pregunta de todas las que hay en la lista 
    this.tituloPregunta = pregunta.nombre //mostrando en el input el nombre de la pregunta
    this.respuestas = pregunta.respuestas
    this.enunciado = pregunta.enunciado
    this.editar = true;
  }
  editarPregunta() {
    let copiaRespuestas = []
    copiaRespuestas = this.respuestas.slice();
    let pregunta = {
      nombre: this.tituloPregunta,
      respuestas: copiaRespuestas,
      enunciado: this.enunciado
    }
    this.listPreguntas[this.position] = pregunta;
    this.editar = false;
    this.limpiar()
  }
  limpiar() {
    this.respuestas.splice(0, this.respuestas.length);
    this.tituloPregunta = ''
    this.enunciado = ''
    this.agregarRespuesta();
  }

  validacion(): boolean {
    // Utiliza el método every() para verificar si todas las respuestas están completas

    let todasCompletas = this.respuestas.every(element => element.respuesta !== "");
    if (todasCompletas) {
      if (this.enunciado == '') {
        todasCompletas = false
      } if (this.tituloPregunta == "") {
        todasCompletas = false
      }
    }
    if (!todasCompletas) {
      this.toastr.error('Complete los campos por favor', 'SaddWy', { positionClass: 'toast-bottom-right' });
    }
    return todasCompletas;

  }
  validacionCorrectas(): boolean {
    // Verifica si al menos uno de los elementos tiene la propiedad 'correcta' establecida como true
    let alMenosUnoCorrecto = this.respuestas.some(element => element.correcta);

    if (!alMenosUnoCorrecto) {
      this.toastr.error('Seleccione al menos una respuesta correcta', 'SaddWy', { positionClass: 'toast-bottom-right' });
    }

    return alMenosUnoCorrecto;
  }
  AgregarNivel() {
    if (this.validarNivel()) {
      if (this.listPreguntas.length == 0) {
        this.toastr.error('Debe agregar al menos una pregunta', 'SaddWy', { positionClass: 'toast-bottom-right' });
      } else {
        let data = {
          nombre: this.nombreNivel,
          explanation: this.expliacion,
          totalPreguntas: this.listPreguntas.length,
          estado: true,
          lenguaje: this.lenguaje
        }
        this.serviceNivel.save(data).subscribe(response => {
          this.idGlobal = response.id;
          this.toastr.success('Nivel creado exitosamente', 'SaddWy', { positionClass: 'toast-bottom-right' });
          this.guardarPreguntas();
        }, error => {
          console.log(error);

        });
      }
    }
  }
  guardarPreguntas() {
    this.listPreguntas.forEach((pregunta: any) => {
      let data = this.convertir(pregunta);
      this.servicePregunta.save(data).subscribe(result => {
        this.toastr.success('Preguntas creadas exitosamente', 'SaddWy', { positionClass: 'toast-bottom-right' });
      }, error => {
        console.log(error);

      });

    });
  }
  editarPreguntas() {
    let preguntasEditadas = 0; // Contador para realizar un seguimiento de cuántas preguntas se han editado correctamente
  
    this.listPreguntas.forEach((pregunta: any) => {
      let data = this.convertirEditar(pregunta);
      if (data.id == undefined) {
        this.servicePregunta.save(data.data).subscribe(result => {
          preguntasEditadas++; // Incrementa el contador después de editar la pregunta correctamente
  
          // Verifica si todas las preguntas han sido editadas
          if (preguntasEditadas === this.listPreguntas.length) {
            // Muestra la alerta cuando todas las preguntas han sido editadas correctamente
            this.mostrarAlertaEdicionExitosa();
          }
        }, error => {
          console.log(error);
        });
      } else {
        this.servicePregunta.editar(data.data, data.id).subscribe(result => {
          preguntasEditadas++; // Incrementa el contador después de editar la pregunta correctamente
  
          // Verifica si todas las preguntas han sido editadas
          if (preguntasEditadas === this.listPreguntas.length) {
            // Muestra la alerta cuando todas las preguntas han sido editadas correctamente
            this.mostrarAlertaEdicionExitosa();
          }
        }, error => {
          console.log(error);
        });
      }
    });
    setTimeout(() => {
      // Aquí puedes especificar la ruta a la que deseas navegar
      this.router.navigate(['/admin/niveles']);
    }, 2000);
  }
  
  mostrarAlertaEdicionExitosa() {
    // Muestra una única alerta cuando todas las preguntas han sido editadas correctamente
    this.toastr.success('Todas las preguntas han sido editadas exitosamente', 'SaddWy', { positionClass: 'toast-bottom-right' });
  }
  
  editarNivel(){
    if (this.validarNivel()) {
      if (this.listPreguntas.length == 0) {
        this.toastr.error('Debe agregar al menos una pregunta', 'SaddWy', { positionClass: 'toast-bottom-right' });
      } else {
        let data = {
          nombre: this.nombreNivel,
          explanation: this.expliacion,
          totalPreguntas: this.listPreguntas.length,
          estado: true,
          lenguaje: this.lenguaje
        }
        this.serviceNivel.editar(data,this.id).subscribe(response => {
          this.idGlobal = response.id;
          this.toastr.success('Nivel editado exitosamente', 'SaddWy', { positionClass: 'toast-bottom-right' });
          this.editarPreguntas();
        }, error => {
          console.log(error);

        });
      }
    }
  }
  convertir(preguntaFrontend: any): any {
    let respuestas: { [key: string]: string } = {};
    preguntaFrontend.respuestas.forEach((respuesta: any, index: number) => {
      respuestas[(index + 1).toString()] = respuesta.respuesta;
    });

    return {
      pregunta: preguntaFrontend.nombre,
      explanation: preguntaFrontend.enunciado,
      respuesta: { ...respuestas, respuesta: preguntaFrontend.respuestas.find((r: any) => r.correcta)?.respuesta },
      estado: true,
      nivel: this.idGlobal
    };
  }
  convertirEditar(preguntaFrontend: any): any {
    let respuestas: { [key: string]: string } = {};
    preguntaFrontend.respuestas.forEach((respuesta: any, index: number) => {
      respuestas[(index + 1).toString()] = respuesta.respuesta;
    });

    return {
      data:{
      pregunta: preguntaFrontend.nombre,
      explanation: preguntaFrontend.enunciado,
      respuesta: { ...respuestas, respuesta: preguntaFrontend.respuestas.find((r: any) => r.correcta)?.respuesta },
      estado: true,
      nivel: this.id
      },
      id:preguntaFrontend.id
    };
  }
  validarNivel(): boolean {
    if (this.expliacion == '' || this.nombreNivel == '' || this.lenguaje == '') {
      this.toastr.error('Complete los campos del nivel, nombre, explicación y pregunta', 'SaddWy', { positionClass: 'toast-bottom-right' });
      return false
    } else {
      return true
    }
  }

}
