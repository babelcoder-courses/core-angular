import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notesObservable: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private noteService: NoteService
  ) {
    this.notesObservable = this.getNotes();
  }

  ngOnInit() {}

  private getNotes() {
    return this.noteService.getNotes();
  }
}
