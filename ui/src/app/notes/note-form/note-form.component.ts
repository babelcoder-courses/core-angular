import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Note } from '../note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<Note>();
  model = new Note();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.formSubmit.emit(this.model);
  }
}
