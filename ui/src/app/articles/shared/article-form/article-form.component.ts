import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Article } from '../article';
import { FlashMessageService } from '../../../shared/flash-message/shared/flash-message.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, OnChanges {

  @Input() formName: string;
  @Input() article: Article;
  @Output() formSubmit = new EventEmitter<Article>();

  articleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    this.setFormValues();
  }

  onSubmit() {
    this.formSubmit.emit(this.articleForm.value);
  }

  clearForm() {
    this.articleForm.setValue({
      title: '',
      excerpt: '',
      content: ''
    });
  }

  private handleUnauthorizedUser(err) {
    if (err.status === 401) {
      this.router.navigateByUrl('/auth/signin');
      this.flashMessageService
        .addMessage('danger', err.error.article.errors[0]);
    }
  }

  private createForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  private setFormValues() {
    if (this.formName !== 'Edit' || !this.article) { return; }

    const { title, excerpt, content } = this.article;

    this.articleForm.setValue({ title, excerpt, content });
  }

}
