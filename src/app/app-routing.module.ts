import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminScreenComponent} from './admin-screen/admin-screen.component';
import {NewsAdminComponent} from './admin-screen/news-admin/news-admin.component';
import {WeatherAdminComponent} from './admin-screen/weather-admin/weather-admin.component';
import {DataFeedsComponent} from './data-feeds/data-feeds.component';

//TODO: authentication
const routes: Routes = [
  {
    path: 'admin',
    component: AdminScreenComponent,
    children: [
      // TODO: something like this{path: '', component: InstructionScreen},
      {path: 'news', component: NewsAdminComponent},
      {path: 'weather', component: WeatherAdminComponent}
    ]},
  {path: '', component: DataFeedsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
