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
      headerInfo: 'Here you can change what video is playing in the Information Screen.',
      info: [
        {
          header:
            'Instructions',
          info: [
            'Copy the Youtube or Vimeo link you want displayed into Video Location box and click save.'
          ]
        }
      ]
    },
    news: {
      header: 'News',
      headerInfo: 'Here you can change what news sources are used to get the news.',
      info: [
        {
          header:
            'API',
          info: [
            'This uses the News API (https://newsapi.org/).',
            'The API key is needed to use the News feed.',
            'You can get the key from here "https://newsapi.org/account".'
          ]
        },
        {
          header:
            'Instructions',
          info: [
            'You can select the news site where the get the top news.',
            'Click on the news source to see more information about it or to remove it.'
          ]
        }
      ]
    },
    weather: {
      header: 'Weather',
      headerInfo: 'Here you can change the weather location and the units used.',
      info: [
        {
          header:
            'API',
          info: [
            'This uses the OpenWeather API (https://openweathermap.org/).',
            'The API key is needed to use the News feed.',
            'You can get the key from here "https://home.openweathermap.org/api_keys".'
          ]
        },
        {
          header:
            'Instructions',
          info: [
            'Type in the city and the units you want to be displayed and click save.'
          ]
        }
      ]
    },
    airport: {
      header: 'Airport',
      headerInfo: 'Here you can select departures or arrivals in the Tallinn airport.',
      info: [
        {
          header:
            'Instructions',
          info: [
            'Select Arrivals or Departures from the dropdown and click save.',
            'Info is from "https://www.tallinn-airport.ee/en/flight-info/realtime-flights/".'
          ]
        }
      ]
    },
  };

  /**
   * Opens the info modal in the feed.
   * @param dialog - MatDialog of the feed component.
   * @param data - the data that is displayed in the feed.
   */
  private openInfo(dialog: MatDialog, data: {header: string, headerInfo: string, info: {header: string, info: string[]}[]}) {
    dialog.open(InfoModalComponent, {
      maxWidth: '80%',
      maxHeight: '80%',
      data: data
    });
  }

  /**
   * Opens info model with video admin screen info.
   * @param dialog - MatDialog of the feed component.
   */
  openInfoVideo(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.video);
  }

  /**
   * Opens info model with weather admin screen info.
   * @param dialog - MatDialog of the feed component.
   */
  openInfoWeather(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.weather);
  }

  /**
   * Opens info model with news admin screen info.
   * @param dialog - MatDialog of the feed component.
   */
  openInfoNews(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.news);
  }

  /**
   * Opens info model with airport admin screen info.
   * @param dialog - MatDialog of the feed component.
   */
  openInfoAirport(dialog: MatDialog) {
    this.openInfo(dialog, this.dialogs.airport);
  }
}
