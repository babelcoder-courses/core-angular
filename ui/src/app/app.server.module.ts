import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { SERVER_LOCAL_STORAGE } from './shared/local-storage.provider';
import { UNIVERSAL_HTTP_INTERCEPTOR } from './universal.provider';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  providers: [SERVER_LOCAL_STORAGE, UNIVERSAL_HTTP_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
