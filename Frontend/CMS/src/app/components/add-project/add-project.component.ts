import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateProjectService, } from '../../services/update-project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  observation: any = { Id: 0, Name: '', Datas: [] };
  selectedIndex = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder, private updateProjectService: UpdateProjectService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.updateProjectService.getObersation().subscribe({
      next: (data) => {
        console.log('Data loaded:', data);
        console.log('Data loaded:', data[0]);
        this.observation = data;
        this.buildForm(this.selectedIndex);
      },
      error: (err) => {
        console.error('Error loading data', err);
      }
    });
  }

  get samplingTimes() {
    return this.observation.Datas.map((d:any) => d.SamplingTime);
  }

  buildForm(index: number) {
    this.form = this.fb.group({});
    const props = this.observation.Datas[index]?.Properties || [];

    props.forEach((prop : any) => {
      this.form.addControl(prop.Label, this.fb.control(prop.Value));
    });
  }

  selectSample(index: number) {
    this.selectedIndex = index;
    this.buildForm(index);
  }

  onSave() {
    const updatedValues = this.form.value;
    const samplingTime = this.samplingTimes[this.selectedIndex];
  
    const updatedProperties = Object.keys(updatedValues).map(label => ({
      Label: label,
      Value: updatedValues[label]
    }));
  
    const payload = {
      SamplingTime: samplingTime,
      Properties: updatedProperties
    };
  
    this.updateProjectService.saveObservation(payload).subscribe({
      next: (res) => {
        console.log('Saved successfully:', res);
      },
      error: (err) => {
        console.error('Error saving data:', err);
      }
    });
  }
  
  
}
