import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PreguntasService } from 'src/app/Core/preguntas.service';
import { RankingService } from 'src/app/Core/ranking.service';
import confetti from 'confetti-js';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  id = 0
  @ViewChild('cerrarVentana') cerrarVentana!: ElementRef;
  voltear = false; //esta variable la usamos para ocultar y mostrar los div
  position = 0 //la posición de la pregunta en el array de preguntas 
  intentos = 0
  error = false
  error2 = false
  listPreguntas: any = []
  pregunta: any //se guarda una sola pregunta en este objecto
  cantidad: number = 0 //es la cantidad de preguntas
  posentaje: number = 0 //la variable porcentaje esta guardando el resultado de 100 dividido cantidad, con el fin de saber cuanto tiene que aumentar la barra 
  respuestas: any = []
  rCorrecta: boolean = false
  btnFinal = false
  correcta = false
  mensaje = ''
  puntos = 0

  constructor(private toars: ToastrService,
    private elRef: ElementRef,
    private router: Router,
    private service: PreguntasService,
    private activeRouter: ActivatedRoute,
    private serviceRanking: RankingService,
    private renderer: Renderer2,
  ) {

  }

  ngOnInit(): void {
    this.cerrarVentana = this.elRef.nativeElement.querySelector('#cerrarVentana'); //antes era cerrar
    this.id = this.activeRouter.snapshot.params['id'];
    this.getPregunta(this.id);
    this.pregunta = this.listPreguntas[this.position]
  }

  girar() { //genera el efecto de giro, ocultando un div y mostrando el otro
    this.voltear = !this.voltear
  }

  siguiente() {
    if (this.rCorrecta) {
      this.position++
      this.pregunta = this.listPreguntas[this.position]
      this.llenar();
      this.error = false
      this.error2 = false
      this.getPregunta(this.id);
      this.correcta = false
      this.respuestas.splice(0, this.respuestas.length);
      this.rCorrecta = false
      this.voltear = false
      if (this.cantidad == this.position + 1) {
        this.btnFinal = true;
      }
    } else {
      this.error = false
      this.error2 = true
    }
  }

  llenar() {
    let lleno = 100 / this.cantidad;

    if (this.position === 0) {
      this.posentaje = lleno * (this.position + 1);
    } else if (this.position === this.cantidad - 1) {
      this.posentaje = 100;
    } else {
      this.posentaje = lleno * (this.position + 1);
    }

  }


  selecionar(i: any) {
    let listaRespuestas = this.respuestas
    let respuesta = listaRespuestas[i]
    respuesta.selecionada = true;
    if (respuesta.correcta) {
      respuesta.clase = 'correcto'
      this.rCorrecta = true
      this.correcta = true
    } else {
      respuesta.clase = 'error'
      this.intentos++
      this.toars.warning('Vuelve a intentarlo', 'SaddWy')

      this.rCorrecta = false
    }
    listaRespuestas[i] = respuesta
    this.respuestas = listaRespuestas
  }

  seguirAprendiendo() {
    this.cerrarModal()
    this.router.navigate(['/dashboard'])
  }
  irRanking() {
    this.cerrarModal()
    this.router.navigate(['/dashboard/ranking'])
  }

  getPregunta(id: any) {
    this.service.getById(id).subscribe(result => {
      this.listPreguntas = result.dato
      this.pregunta = this.listPreguntas[this.position];
      let res = Object.values(this.pregunta.respuesta)
      this.ordenar(res)
      this.cantidad = this.listPreguntas.length
    }, error => {
      console.log(error);

    })
  }

  ordenar(res: any) {
    let correcta = res[res.length - 1]
    for (let i = 0; i < res.length - 1; i++) {
      if (res[i] == correcta) {
        let respuesta = { respuesta: res[i], correcta: true, selecionada: false, clase: 'boton' }
        this.respuestas.push(respuesta)
      } else {
        let respuesta = { respuesta: res[i], correcta: false, selecionada: false, clase: 'boton' }
        this.respuestas.push(respuesta)
      }
    }

  }
  agregarPuntos() {
    if (this.rCorrecta) {
      this.abrirModal()
      this.crearConfetti()
      this.llenar();
      let data = {
        "id": this.id,
        "intentos": this.intentos
      }
      this.service.actualizar(this.id, data).subscribe(result => {
        this.mensaje = result.mensaje
        this.traerPuntos();
      }, error => {
        console.log(error);
      });
    } else {
      this.error2 = true
    }
  }

  traerPuntos() {
    this.serviceRanking.getAll().subscribe(result => {
      this.puntos = result.dato.usuario.puntos
    },
      error => {
        console.log(error);

      });
  }
  abrirModal() {
    const modal = document.getElementById('exampleModal');
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'block');
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade', 'show');
    this.renderer.appendChild(document.body, backdrop);
  }
  cerrarModal() {
    const modal = document.getElementById('exampleModal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.removeStyle(modal, 'display');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
  crearConfetti() {
    const confettiSettings = { target: 'confettiCanvas', max:'300',height:'450',size:'1.8'};
    const confetti2 = new confetti(confettiSettings);
    confetti2.render()
  }
}
