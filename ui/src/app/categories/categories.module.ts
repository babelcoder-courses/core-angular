import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './shared/category.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    CategoriesComponent,
    CategoryListComponent
  ],
  providers: [
    CategoryService
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
