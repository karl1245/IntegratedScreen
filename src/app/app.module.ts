import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WeatherComponent } from './data-feeds/weather-feed/weather.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WeatherAdminComponent } from './admin-screen/weather-admin/weather-admin.component';
import { NewsComponent } from './data-feeds/news-feed/news.component';
import { NewsAdminComponent } from './admin-screen/news-admin/news-admin.component';
import { CountryNamePipe } from './shared/country-name.pipe';
import { AdminScreenComponent } from './admin-screen/admin-screen.component';
import { DataFeedsComponent } from './data-feeds/data-feeds.component';
import { HeaderComponent } from './admin-screen/header/header.component';
import {NewsService} from './shared/news/news.service';
import {WeatherService} from './shared/weather/weather.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherAdminComponent,
    NewsComponent,
    NewsAdminComponent,
    CountryNamePipe,
    AdminScreenComponent,
    DataFeedsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  providers: [
    NewsService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
