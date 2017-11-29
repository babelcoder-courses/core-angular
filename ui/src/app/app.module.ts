import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';
import { AppComponent } from './app.component';
import { BROWSER_LOCAL_STORAGE } from './shared/local-storage.provider';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    CoreModule,
    BooksModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [BROWSER_LOCAL_STORAGE],
  bootstrap: [AppComponent]
})
export class AppModule { }
