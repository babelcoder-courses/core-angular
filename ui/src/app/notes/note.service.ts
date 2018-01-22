import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Note } from './note';

@Injectable()
export class NoteService {
  notesRef: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {
    this.notesRef = db.list('notes');
  }

  createNote(note: Note) {
    this.notesRef.push(note);
  }

  getNotes(): Observable<any[]> {
    return this.notesRef.valueChanges();
  }
}
