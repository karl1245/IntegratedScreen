import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminScreenComponent} from './admin-screen/admin-screen.component';
import {NewsAdminComponent} from './admin-screen/news-admin/news-admin.component';
import {WeatherAdminComponent} from './admin-screen/weather-admin/weather-admin.component';
import {DataFeedsComponent} from './data-feeds/data-feeds.component';
import {VideoAdminComponent} from './admin-screen/video-admin/video-admin.component';
import {TransportAdminComponent} from './admin-screen/transport-admin/transport-admin.component';

//TODO: authentication
const routes: Routes = [
  {
    path: 'admin',
    component: AdminScreenComponent,
    children: [
      {path: 'news', component: NewsAdminComponent},
      {path: 'weather', component: WeatherAdminComponent},
      {path: 'video', component: VideoAdminComponent},
      {path: 'transport', component: TransportAdminComponent}
    ]},
  {path: '', component: DataFeedsComponent},
  {path: '**', redirectTo: ''} //TODO: maybe later direct to pageNotFound?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
