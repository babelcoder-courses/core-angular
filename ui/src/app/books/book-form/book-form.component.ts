import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentCanDeactivate } from '../../shared/component-can-deactivate';
import { MockBookService } from '../shared/mock-book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, ComponentCanDeactivate {

  form: FormGroup;
  formType: 'NEW' | 'EDIT';
  isDirty = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private bookService: MockBookService
  ) { }

  ngOnInit() {
    this.formType = this.route.snapshot.data.formType;

    this.createForm();
    if(this.formType !== 'EDIT') this.loadBook();
  }

  canDeactivate(): boolean {
    return this.isDirty;
  }

  onSubmit(event) {
    event.preventDefault();

    this.isDirty = true;
    this.formType === 'NEW' ? this.createBook() : this.updateBook();
  }

  createBook() {
    this.bookService.createBook(this.form.value);
    this.router.navigate(['/books']);
  }

  updateBook() {
    const { id } = this.route.snapshot.params
    this.bookService.updateBook(id, this.form.value);
    this.router.navigate(['/books', id]);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  private loadBook() {
    const { id } = this.route.snapshot.params;

    this.bookService
      .getBook(id)
      .subscribe(({ title, content }: Book) => {
        this.form.setValue({ title, content });
      });
  }

}
