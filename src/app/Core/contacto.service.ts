import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private urlBase = 'http://77.37.63.223:8000/api/v01/contact/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }

  save(data:any) {
      return this.Http.post<any>(this.urlBase,data,{headers :this.httpHeader})
  }

}
