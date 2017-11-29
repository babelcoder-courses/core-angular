import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders } from '@angular/core';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UnsavedChangesGuard } from './unsaved-changes.guard';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageService } from './flash-message/shared/flash-message.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    FlashMessageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessageComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        FlashMessageService,
        AuthService,
        AuthGuard,
        UnsavedChangesGuard
      ]
    }
  }
}
