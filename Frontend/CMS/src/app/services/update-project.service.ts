// update-project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {
  private apiUrl = 'http://localhost:3000/api/observation';

  constructor(private http: HttpClient) {}

  getObersation(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
   
  saveObservation(payload: any) {
    return this.http.put(`${this.apiUrl}/save`, payload);  
  }
}
