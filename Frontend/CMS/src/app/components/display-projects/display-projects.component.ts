import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoadProjectService, RoadProject } from '../../services/display-projects.service';
 
@Component({
  selector: 'app-display-projects',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],  // HttpClientModule added here
  templateUrl: './display-projects.component.html',
  styleUrls: ['./display-projects.component.css'] 
})
export class DisplayProjectsComponent implements OnInit {
  roadConstructionData: RoadProject[] = [];
  
  constructor(private projectService: RoadProjectService) {}

  ngOnInit(): void {
    this.projectService.getRoadProjects().subscribe({
      next: (data: RoadProject[]) => {
        console.log('Road projects loaded:', data);  
        this.roadConstructionData = data; 
      },
      error: (err) => {
        console.error('Error loading road projects', err);
      }
    });
  }
}
