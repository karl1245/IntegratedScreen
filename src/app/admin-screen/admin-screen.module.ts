import {NgModule} from '@angular/core';
import {WeatherAdminComponent} from './weather-admin/weather-admin.component';
import {NewsAdminComponent} from './news-admin/news-admin.component';
import {AdminScreenComponent} from './admin-screen.component';
import {VideoAdminComponent} from './video-admin/video-admin.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CountryNamePipe} from '../shared/country-name.pipe';
//import {TransportAdminComponent} from './transport-admin/transport-admin.component';
import {MaterialModule} from '../material/material.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SavedMessageComponent} from './saved-message/saved-message.component';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    WeatherAdminComponent,
    NewsAdminComponent,
    AdminScreenComponent,
    VideoAdminComponent,
    CountryNamePipe,
    //TransportAdminComponent,
    SidenavComponent,
    SavedMessageComponent,
    InfoModalComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
  ],
  providers: [
  ],
  exports: [
    WeatherAdminComponent,
    NewsAdminComponent,
    AdminScreenComponent,
    VideoAdminComponent,
    CountryNamePipe,
    //TransportAdminComponent,
    SidenavComponent
  ],
  entryComponents: [
    InfoModalComponent
  ]
})
export class AdminScreenModule {

}
