import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-evaluaciones',
  templateUrl: './agregar-evaluaciones.component.html',
  styleUrls: ['./agregar-evaluaciones.component.css']
})
export class AgregarEvaluacionesComponent implements OnInit {
  respuestas: { respuesta: string, correcta: boolean }[] = [{ respuesta: '', correcta: false }];
  tituloPregunta: string = ''
  enunciado: string = ''
  listPreguntas: any = []
  editar = false;
  position = -1;
  ngOnInit(): void {

  }
  constructor(private toastr: ToastrService) {

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
      this.toastr.error('Complete los campos por favor');
    }
    return todasCompletas;

  }
  validacionCorrectas(): boolean {
    // Verifica si al menos uno de los elementos tiene la propiedad 'correcta' establecida como true
    let alMenosUnoCorrecto = this.respuestas.some(element => element.correcta);

    if (!alMenosUnoCorrecto) {
      this.toastr.error('Seleccione al menos una respuesta correcta');
    }

    return alMenosUnoCorrecto;
  }


}
