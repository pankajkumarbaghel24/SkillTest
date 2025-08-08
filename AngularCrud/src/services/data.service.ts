import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private configUrl = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }

  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  putData(id: any, data: any) {
    return this.http.put(`${this.configUrl}${id}`, data);
    }

  deleteData( id: any) {
    return this.http.delete(`${this.configUrl}${id}` )
  }
  
}
