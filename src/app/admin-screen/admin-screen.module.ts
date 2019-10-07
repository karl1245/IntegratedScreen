import {NgModule} from '@angular/core';
import {WeatherAdminComponent} from './weather-admin/weather-admin.component';
import {NewsAdminComponent} from './news-admin/news-admin.component';
import {AdminScreenComponent} from './admin-screen.component';
import { VideoAdminComponent } from './video-admin/video-admin.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CountryNamePipe} from '../shared/country-name.pipe';

@NgModule({
  declarations: [
    WeatherAdminComponent,
    NewsAdminComponent,
    AdminScreenComponent,
    VideoAdminComponent,
    CountryNamePipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    WeatherAdminComponent,
    NewsAdminComponent,
    AdminScreenComponent,
    VideoAdminComponent,
    CountryNamePipe
  ]
})
export class AdminScreenModule {

}
