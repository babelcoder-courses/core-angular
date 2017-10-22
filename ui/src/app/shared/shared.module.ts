import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
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
    HttpModule
  ],
  declarations: [
    FlashMessageComponent
  ],
  exports: [
    CommonModule,
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
        AuthInterceptor,
        AuthGuard,
        UnsavedChangesGuard
      ]
    }
  }
}
