import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreguntasService } from 'src/app/Core/preguntas.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  id = 0
  @ViewChild('cerrar') cerrar!: ElementRef;
  voltear = false; //esta variable la usamos para ocultar y mostrar los div
  position = 0 //la posicion de la pregunta en el array de preguntas 
  intentos = 0
  error = false
  error2 = false
  listPreguntas: any = []
  pregunta :any //se guarda una sola pregunta en este objecto
  cantidad: number = 0 //es la cantidad de preguntas
  posentaje: number = 0 //la variable porsentaje esta guardando el resultado de 100 dividido cantidad, con el fin de saber cuanto tiene que aumentar la barra 
  respuestas:any=[]
  rCorrecta!:boolean

  constructor(private toars: ToastrService,
              private elRef: ElementRef,
              private router: Router,
              private service:PreguntasService,
              private activeRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cerrar = this.elRef.nativeElement.querySelector('#cerrar');
    this.id = this.activeRouter.snapshot.params['id'];
    this.getPregunta(this.id);
    this.pregunta=this.listPreguntas[this.position]
  }
  
  girar() { //genera el efecto de giro, ocultando un div y mostrando el otro
    this.voltear = !this.voltear
  }

  siguiente() {
    if (true) {
      if (this.rCorrecta) {
        this.position++
        this.pregunta = this.listPreguntas[this.position]
        this.llenar();
        this.error = false
        this.error2 = false
        this.getPregunta(this.id);
        this.respuestas.splice(0, this.respuestas.length);
      } else {
        this.error = false
        this.error2 = true
      }
    }
  }

  llenar() {
    let lleno = 100 / this.cantidad
    this.posentaje = lleno * this.position
  }

  selecionar(i: any) {
    let listaRespuestas = this.respuestas
    let respuesta = listaRespuestas[i]
    respuesta.selecionada = true;
    if (respuesta.correcta) {
      respuesta.clase = 'correcto'
      this.rCorrecta = true
    } else {
      respuesta.clase = 'error'
      this.intentos++
      this.toars.warning('Vuelve a intentarlo', 'SaddWy')
      this.rCorrecta=false
    }
    listaRespuestas[i] = respuesta
    this.respuestas = listaRespuestas
  }

  // validacion(): boolean {
  //   let respuestas = this.respuestas
  //   let seleccionada = this.respuestas.some(element => element.selecionada)
  //   if (!seleccionada) {
  //     this.error = true
  //   }
  //   return seleccionada;
  // }

  seguirAprendiendo() {
    this.cerrar.nativeElement.click();
    this.router.navigate(['/dashboard'])
  }
  irRanking() {
    this.cerrar.nativeElement.click();
    this.router.navigate(['/dashboard/ranking'])
  }

  getPregunta(id:any){
    this.service.getById(id).subscribe(result=>{
      this.listPreguntas=result.dato
      this.pregunta=this.listPreguntas[this.position];
      let res=Object.values(this.pregunta.respuesta)
      this.ordenar(res)
      this.cantidad=this.listPreguntas.length
      console.log(this.pregunta);
      console.log(this.respuestas);
      
    
    },error=>{
      console.log(error);
      
    })
  }

  ordenar(res:any){
    let correcta=res[res.length-1]
   for (let i = 0; i < res.length-1; i++) {
    if (res[i]==correcta) {
      let respuesta={ respuesta: res[i], correcta: true, selecionada: false, clase: 'boton' }
      this.respuestas.push(respuesta)
    }else{
      let respuesta={ respuesta: res[i], correcta: false, selecionada: false, clase: 'boton' }
      this.respuestas.push(respuesta)
    }
   }
    
  }

}
