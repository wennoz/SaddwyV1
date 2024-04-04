import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/Core/ranking.service';
import { UsuarioService } from 'src/app/Core/usuario.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{
  user:any
  puntos:any
  ranking:any=[]
  ngOnInit(): void {
    let usu=localStorage.getItem('user')
    if (usu) {
      this.user=JSON.parse(usu)
    }
    this.getAll()
  }
  constructor(private service:RankingService){}

  getAll(){
    this.service.getAll().subscribe(result=>{
      this.puntos=result.dato.usuario
      this.ranking=Object.values(result.dato.listado);
    },error=>{
      console.log(error);
    });
  }
}
