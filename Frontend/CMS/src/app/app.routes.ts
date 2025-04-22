import { Routes } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { DisplayProjectsComponent } from './components/display-projects/display-projects.component';
import { MainLayoutComponent } from '../layouts/main-layout.component';

export const routes: Routes = [
    {
      path: '', 
      component: MainLayoutComponent,
      children: [
        { path: '', redirectTo: 'add-project', pathMatch: 'full' },
        { path: 'add-project', component: AddProjectComponent },
        { path: 'display-projects', component: DisplayProjectsComponent },
      ],
    },
  ];
  
  