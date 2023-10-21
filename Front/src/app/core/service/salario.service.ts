import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  public url;
  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  
}
