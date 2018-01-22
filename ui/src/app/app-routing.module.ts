import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { NoteComponent } from './notes/note/note.component';
import { NoteListComponent } from './notes/note-list/note-list.component';

const appRoutes: Routes = [
  { path: 'note/:id', component: NoteComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/new', component: CreateNoteComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
