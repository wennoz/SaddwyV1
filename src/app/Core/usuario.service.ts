import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlBase = 'http://77.37.63.223:8000/api/v01/';
  private httpHeader:HttpHeaders

  private perfilSubject = new BehaviorSubject<any>(null);
  perfil$ = this.perfilSubject.asObservable();

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }
   
  save(data:any) {
      return this.Http.post<any>(this.urlBase+"register/",data,{headers :this.httpHeader})
  }

  edit(data:any){
    return this.Http.put<any>(this.urlBase+"edit/",data,{headers :this.httpHeader})
  }
  getProfile() {
    return this.Http.get<any>(this.urlBase+"profile/",{headers :this.httpHeader})
  }


  delete(id:number) {
    return this.Http.delete<any>(this.urlBase+id.toString(),{headers :this.httpHeader})
  }

  actualizar(perfil:any){
    this.perfilSubject.next(perfil);
  }
}
