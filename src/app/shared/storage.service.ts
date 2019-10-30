import {NewsSource} from './news/news-source';

export class StorageService {
  constructor() {}

  /**
   * Reads weather options from storage.
   * Returns {city: string, isMetric: boolean}.
   */
  getWeather() {
    const weatherSettings = localStorage.getItem("weather");
    return weatherSettings != null ? JSON.parse(weatherSettings) : {city: "", isMetric: true};
  }

  /**
   * Reads selected news sources from storage.
   * Returns array of news sources or empty array.
   */
  getNews() {
    const news = localStorage.getItem("news");
    return news != null ? JSON.parse(news).newsSources : [];
  }

  /**
   * Reads news API key from storage
   * Returns API key or empty string.
   */
  getNewsAPIKey() {
    const key = localStorage.getItem("newsAPIKey");
    return key != null ? key : "";
  }

  /**
   * Reads weather API key from storage
   * Returns API key or empty string.
   */
  getWeatherAPIKey() {
    const key = localStorage.getItem("weatherAPIKey");
    return key != null ? key : "";
  }

  /**
   * Reads video id from storage
   * Returns video id or empty string.
   */
  getVideo() {
    const video = localStorage.getItem("videoId");
    return video != null ? video : "";
  }


  /**
   * Save video id to local storage
   * @param videoId - v parameter of youtube link.
   */
  saveVideo(videoId: string) {
    localStorage.setItem("videoId", videoId);
  }

  /**
   * Saves selected news sources to local storage.
   * @param newsSources - array of selected NewsSources
   */
  saveNews(newsSources: NewsSource[]) {
    localStorage.setItem("news", JSON.stringify({newsSources: newsSources}));
  }

  /**
   * Saves city and units to local storage.
   * @param city - name of the city.
   * @param isMetric - boolean value if is Celsius (true) or Fahrenheit (false).
   */
  saveWeather(city: string, isMetric: boolean) {
    localStorage.setItem("weather", JSON.stringify({city: city, isMetric: isMetric}));
  }

  /**
   * Saves weather API key to local storage.
   * @param APIKey
   */
  saveNewsAPIKey(APIKey: string) {
    localStorage.setItem("newsAPIKey", APIKey);
  }

  /**
   * Saves weather API key to local storage.
   * @param APIKey
   */
  saveWeatherAPIKey(APIKey: string) {
    localStorage.setItem("weatherAPIKey", APIKey);
  }
}
