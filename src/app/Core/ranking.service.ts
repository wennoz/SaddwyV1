import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private urlBase = 'http://127.0.0.1:8000/api/v01/ranking/';
  private httpHeader:HttpHeaders

  constructor(private Http:HttpClient) {
    this.httpHeader = new HttpHeaders();
    this.httpHeader.append('Content-Type', 'application/json');
   }
   getAll() {
    return this.Http.get<any>(this.urlBase,{ headers :this.httpHeader })
  }
 
}
