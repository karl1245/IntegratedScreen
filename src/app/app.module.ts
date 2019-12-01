import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpClientModule} from '@angular/common/http';
import {AdminScreenModule} from './admin-screen/admin-screen.module';
import {DataFeedModule} from './data-feeds/data-feed.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {UpdateDataTimerService} from './shared/updateDataTimer.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminScreenModule,
    DataFeedModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    UpdateDataTimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
