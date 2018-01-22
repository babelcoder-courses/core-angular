import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  constructor(private router: Router, private noteService: NoteService) {}

  ngOnInit() {}

  createNote(note: Note) {
    this.noteService.createNote(note);
    this.router.navigateByUrl('/');
  }
}
