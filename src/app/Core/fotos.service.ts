import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private urlBase = 'http://77.37.63.223:8000/api/v01/admin/photos/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }
   getAll() {
    return this.Http.get<any>(this.urlBase,{ headers :this.httpHeader })
  }
  save(data:any) {
      return this.Http.post<any>(this.urlBase,data,{headers :this.httpHeader})
  }
  editar(data:any,id:any){
    return this.Http.put<any>(this.urlBase+id+"/",data,{headers :this.httpHeader})
  }

  getById(id:number) {
    return this.Http.get<any>(this.urlBase+"/"+id,{headers :this.httpHeader})
  }

  delete(id:number) {
    return this.Http.delete<any>(this.urlBase+id.toString(),{headers :this.httpHeader})
  }
}
