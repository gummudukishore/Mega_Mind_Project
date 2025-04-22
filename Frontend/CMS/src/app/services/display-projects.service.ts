import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RoadProject {
  samplingTime: string;
  projectName: string | null;
  constructionCount: number | null;
  isCompleted: boolean | null;
  roadLength: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class RoadProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) {}

  getRoadProjects(): Observable<RoadProject[]> {
    return this.http.get<RoadProject[]>(this.apiUrl);
  }
}
