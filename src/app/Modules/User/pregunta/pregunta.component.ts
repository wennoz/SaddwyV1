import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit{
  @ViewChild('cerrar') cerrar!: ElementRef;
  voltear = false; //esta variable la usamos para ocultar y mostrar los div
  position = 0 //la posicion de la pregunta en el array de preguntas 
  intentos=0
  error=false
  error2=false
  listPreguntas = [
    {
      pregunta: 'pregunta 1',
      enunciado: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim atque doloribus, provident natus veritatis at illo explicabo, ex neque est soluta culpa magnam, exercitationem harum dicta quibusdam sunt ducimus inventore.',
      respuestas: [{ respuesta: 'respuesta 1', correcta: false, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 2', correcta: true, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 3', correcta: false, selecionada: false, clase: 'boton' }],
      rCorrecta: false
    },
    {
      pregunta: 'pregunta 2',
      enunciado: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim atque doloribus, provident natus veritatis at illo explicabo, ex neque est soluta culpa magnam, exercitationem harum dicta quibusdam sunt ducimus inventore.',
      respuestas: [{ respuesta: 'Falso', correcta: false, selecionada: false, clase: 'boton' }, { respuesta: 'Verdadero', correcta: true, selecionada: false, clase: 'boton' }],
      rCorrecta: false
    },
    {
      pregunta: 'pregunta 3',
      enunciado: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim atque doloribus, provident natus veritatis at illo explicabo, ex neque est soluta culpa magnam, exercitationem harum dicta quibusdam sunt ducimus inventore.',
      respuestas: [{ respuesta: 'respuesta 1', correcta: false, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 2', correcta: true, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 3', correcta: false, selecionada: false, clase: 'boton' }],
      rCorrecta: false
    },
    {
      pregunta: 'pregunta 1',
      enunciado: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim atque doloribus, provident natus veritatis at illo explicabo, ex neque est soluta culpa magnam, exercitationem harum dicta quibusdam sunt ducimus inventore.',
      respuestas: [{ respuesta: 'respuesta 1', correcta: false, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 2', correcta: true, selecionada: false, clase: 'boton' }, { respuesta: 'respuesta 3', correcta: false, selecionada: false, clase: 'boton' }],
      rCorrecta: false
    }
  ] //el array de preguntas
  pregunta = this.listPreguntas[this.position] //se guarda una sola pregunta en este objecto
  cantidad: number = this.listPreguntas.length //es la cantidad de preguntas
  posentaje: number = 0 //la variable porsentaje esta guardando el resultado de 100 dividido cantidad, con el fin de saber cuanto tiene que aumentar la barra 

  constructor(private toars:ToastrService,private elRef: ElementRef, private router:Router){
    
  }

  ngOnInit(): void {
    this.cerrar = this.elRef.nativeElement.querySelector('#cerrar');
  }
  girar() { //genera el efecto de giro, ocultando un div y mostrando el otro
    this.voltear = !this.voltear
  }

  siguiente() {
    if (this.validacion()) {
        if (this.pregunta.rCorrecta) {
          this.position++
          this.pregunta = this.listPreguntas[this.position]
          this.llenar(); 
          this.error=false
          this.error2=false
        }else{
          this.error=false
          this.error2=true
        }
    }
  }

  llenar() {
    let lleno= 100 / this.cantidad
   this.posentaje=lleno*this.position 
  }

  selecionar(i: any) {
    let listaRespuestas = this.pregunta.respuestas
    let respuesta = listaRespuestas[i]
    respuesta.selecionada = true;
    if (respuesta.correcta) {
      respuesta.clase = 'correcto'
      this.pregunta.rCorrecta=true
    } else {
      respuesta.clase = 'error'
      this.intentos++
      this.toars.warning('Vuelve a intentarlo', 'SaddWy')
    }
    listaRespuestas[i] = respuesta
    this.pregunta.respuestas = listaRespuestas
  }

  validacion(): boolean {
    let respuestas = this.pregunta.respuestas
    let seleccionada = respuestas.some(element => element.selecionada)
    if (!seleccionada) {
    this.error=true
    }
    return seleccionada;
  }

  seguirAprendiendo(){
    this.cerrar.nativeElement.click();
   this.router.navigate(['/dashboard'])
  }
  irRanking(){
    this.cerrar.nativeElement.click();
    this.router.navigate(['/dashboard/ranking'])
  }

}
