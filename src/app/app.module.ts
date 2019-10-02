import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './dataFeeds/weather/weather.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WeatherAdminComponent } from './adminScreen/weather-admin/weather-admin.component';
import { NewsComponent } from './dataFeeds/news/news.component';
import { NewsAdminComponent } from './adminScreen/news-admin/news-admin.component';
import { CountryNamePipe } from './shared/country-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherAdminComponent,
    NewsComponent,
    NewsAdminComponent,
    CountryNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
