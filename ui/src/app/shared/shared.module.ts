import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './auth.guard';
import { UnsavedChangesGuard } from './unsaved-changes.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { FlashMessageService } from './flash-message/shared/flash-message.service';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FlashMessageComponent,
    TruncatePipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlashMessageComponent,
    TruncatePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        UnsavedChangesGuard,
        AuthService,
        FlashMessageService
      ]
    };
  }
}
