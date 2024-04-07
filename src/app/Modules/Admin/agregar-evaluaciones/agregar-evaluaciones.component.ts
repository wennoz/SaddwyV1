import { Component, OnInit } from '@angular/core';
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
  lenguaje=''
  listPreguntas: any = []
  editar = false;
  position = -1;
  listLenguajes:any=[]
  idGlobal=0

  ngOnInit(): void {
    this.getLenguajes();
  }
  constructor(private toastr: ToastrService,
     private serviceLenguaje:LenguajesAdminService,  
     private serviceNivel:NivelesService,
     private servicePregunta:PreguntasAdminService
    ) {  }

  getLenguajes(){
    this.serviceLenguaje.getAll().subscribe(result=>{
      this.listLenguajes=result
      
    },error=>{
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
  eliminarPregunta(i: any) {
    this.listPreguntas.splice(i, 1)
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
      this.toastr.error('Complete los campos por favor','SaddWy',{positionClass: 'toast-bottom-right'});
    }
    return todasCompletas;

  }
  validacionCorrectas(): boolean {
    // Verifica si al menos uno de los elementos tiene la propiedad 'correcta' establecida como true
    let alMenosUnoCorrecto = this.respuestas.some(element => element.correcta);

    if (!alMenosUnoCorrecto) {
      this.toastr.error('Seleccione al menos una respuesta correcta','SaddWy',{positionClass: 'toast-bottom-right'});
    }

    return alMenosUnoCorrecto;
  }
  AgregarNivel(){
    if (this.validarNivel()) {
      if (this.listPreguntas.length==0) {
        this.toastr.error('Debe agregar al menos una pregunta','SaddWy',{positionClass: 'toast-bottom-right'});
      }else{
        let data={
          nombre: this.nombreNivel,
          explanation: this.expliacion,
          totalPreguntas: this.listPreguntas.length,
          estado: true,
          lenguaje: this.lenguaje
        }
        this.serviceNivel.save(data).subscribe(response=>{
          this.idGlobal=response.id;
          this.toastr.success('Nivel creado exitosamente','SaddWy',{positionClass: 'toast-bottom-right'});
          this.guardarPreguntas();
        },error=>{
          console.log(error);
          
        });
      } 
    }
  }
  guardarPreguntas(){
   this.listPreguntas.forEach((pregunta:any) => {
     let data= this.convertir(pregunta);
     this.servicePregunta.save(data).subscribe(result=>{
      this.toastr.success('Preguntas creadas exitosamente','SaddWy',{positionClass: 'toast-bottom-right'});
     },error=>{
      console.log(error);
      
     });
     
   });
  }
  convertir(preguntaFrontend: any): any {
    let respuestas: { [key: string]: string } = {};
    preguntaFrontend.respuestas.forEach((respuesta:any, index:number) => {
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
  validarNivel():boolean{
    if (this.expliacion==''||this.nombreNivel==''||this.lenguaje=='') {
      this.toastr.error('Complete los campos del nivel, nombre, explicación y pregunta','SaddWy',{positionClass: 'toast-bottom-right'});
      return false
    }else{
      return true
    }
  }
}
