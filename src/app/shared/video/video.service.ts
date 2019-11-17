import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

/**
 * Handles embedded video player related tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  currentVideo: string;
  newVideo = new BehaviorSubject(this.currentVideo);

  constructor(private storageService: StorageService, private router: Router) {
    const savedVideo = this.storageService.getVideo();
    this.currentVideo = this.processUrl(savedVideo);
    this.newVideo.next(this.currentVideo);
  }

  /**
   * Saves video as new video in data feed
   * @param videoRaw - url of the video.
   */
  saveVideo(videoRaw: string) {
    this.storageService.saveVideo(videoRaw);

    this.currentVideo = this.processUrl(videoRaw);
    this.newVideo.next(this.currentVideo);
  }

  /**
   * Gets the video id out of input url and returns it.
   * @param videoRaw - string value of the youtube video (example: https://www.youtube.com/watch?v=nWpSeuPzsKI).
   */
  private processUrl(videoRaw: string) {
    let videoProcessed = videoRaw;

    if (videoProcessed.includes('https://')) {
      videoProcessed = videoProcessed.substring('https://'.length, videoProcessed.length);
    }

    if (videoProcessed.includes('youtube')) {
      const videoId = this.router.parseUrl(videoProcessed).queryParamMap.get('v');
      return this.getYoutubeLink(videoId);
    } else if (videoProcessed.includes('vimeo')){
      let videoId = videoProcessed.split('?')[0];
      videoId = videoId.split('/')[videoId.split('/').length - 1];
      return this.getVimeoLink(videoId);
    } else {
      return videoProcessed;
    }
  }

  /**
   * Processes Youtube video id and returns url to use in iframe.
   * @param id - id of the Youtube video.
   */
  private getYoutubeLink(id: string) {
    let videoUrl = 'https://www.youtube.com/embed/' + id;
    videoUrl += ('?playlist=' + id);
    videoUrl += '&controls=0';
    videoUrl += '&loop=1';
    videoUrl += '&autoplay=1';
    videoUrl += '&modestbranding=1';
    videoUrl += '&rel=0';
    return videoUrl;
  }

  /**
   * Processes Vimeo video id and returns url to use in iframe.
   * @param id - if of the Vimeo video.
   */
  private getVimeoLink(id: string) {
    let videoUrl = 'https://player.vimeo.com/video/' + id;
    videoUrl += '?autoplay=1';
    videoUrl += '&loop=1';
    videoUrl += '&title=0';
    videoUrl += '&byline=0';
    videoUrl += '&portrait=0';
    videoUrl += '&quality=1080p';
    return videoUrl;
  }

  /**
   * Returns the url the user saved.
   */
  getVideoRaw() {
    return this.storageService.getVideo();
  }
}
