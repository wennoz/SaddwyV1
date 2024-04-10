import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private urlBase = 'http://127.0.0.1:8000/api/v01/ContactUs/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }

  save(data:any) {
      return this.Http.post<any>(this.urlBase,data,{headers :this.httpHeader})
  }

}
