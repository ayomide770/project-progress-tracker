import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {

  // Reactive form controls
  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  // Message displayed when a project code is invalid
  invalidProjectCode = false;

  // Hard-coded project code mapping
  projectCodes: Record<string, string> = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard'
  };

  // Event handler triggered when the user leaves Project Code
  onProjectCodeBlur(): void {

    const code = this.progressNotesForm.controls.projectCode.value
      ?.trim()
      .toUpperCase() || '';

    const projectName = this.projectCodes[code];

    if (projectName) {

      // Automatically populate Project Name
      this.progressNotesForm.controls.projectName.setValue(projectName);

      // Hide invalid-code message
      this.invalidProjectCode = false;

    } else {

      // Clear Project Name for invalid codes
      this.progressNotesForm.controls.projectName.setValue('');

      // Show message only when a nonempty invalid code is entered
      this.invalidProjectCode = code !== '';
    }
  }
}