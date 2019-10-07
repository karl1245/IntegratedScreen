import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './admin-screen/header/header.component';
import { NewsService } from './shared/news/news.service';
import { WeatherService } from './shared/weather/weather.service';
import { AdminScreenModule } from './admin-screen/admin-screen.module';
import { DataFeedModule } from './data-feeds/data-feed.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminScreenModule,
    DataFeedModule
  ],
  providers: [
    NewsService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
