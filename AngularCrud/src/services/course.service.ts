import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private configUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }




  
}
