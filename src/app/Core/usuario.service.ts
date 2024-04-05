import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlBase = 'http://127.0.0.1:8000/api/v01/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }
   getAll() {
    return this.Http.get<any>(this.urlBase,{ headers :this.httpHeader })
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
}
