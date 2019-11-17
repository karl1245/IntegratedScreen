import {MatDialog} from '@angular/material';
import {InfoModalComponent} from '../admin-screen/info-modal/info-modal.component';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService {
  dialogs = {
    video: {
      header: 'Video',
      info: [
        'Here you can change what video is playing in the Information Screen.',
        'You can add a Vimeo or a Youtube video link.',
        'Copy the video link into the Video Location box.'
      ]
    },
    news: {
      header: 'News',
      info: [
        'Here you can change what news sources are used to find the news.',
        'This uses the News API (https://newsapi.org/).',
        'The API key is needed to use the News feed.',
        'You can get the key from here "https://newsapi.org/account".',
        'You can select the news site where the get the top news.'
      ]
    },
    weather: {
      header: 'Weather',
      info: [
        'Here you can change the weather location and whether it is Celsius or Fahrenheit.',
        'This uses the OpenWeather API (https://openweathermap.org/).',
        'The API key is needed to use the News feed.',
        'You can get the key from here "https://home.openweathermap.org/api_keys".',
        'Type in the city and the units you want to be displayed and click save.'
      ]
    }
  };

  /**
   * Opens the info modal in the feed.
   * @param dialog - MatDialog of the feed component.
   * @param data - the data that is displayed in the feed.
   */
  private openInfo(dialog: MatDialog, data: {header: string, info: string[]}) {
    dialog.open(InfoModalComponent, {
      maxWidth: '80%',
      maxHeight: '80%',
      data: data
    });
  }

  openInfoVideo(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.video);
  }

  openInfoWeather(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.weather);
  }

  openInfoNews(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.news);
  }
}
