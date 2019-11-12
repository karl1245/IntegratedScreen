import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

@Injectable()
export class VideoService {
  currentVideoId: string;
  newVideo = new BehaviorSubject(this.currentVideoId);


  constructor(private storageService: StorageService, private router: Router) {
    this.currentVideoId = this.storageService.getVideo();
    this.newVideo.next(this.currentVideoId);
  }

  /**
  * Saves video as new video in data feed
  * @param id - v parameter in "https://www.youtube.com/watch?v=nWpSeuPzsKI"
  */
  saveVideo(videoRaw: string) {
    const videoId = this.processUrl(videoRaw);

    this.currentVideoId = videoId;
    this.newVideo.next(this.currentVideoId);
    this.storageService.saveVideo(videoId);
  }

  /**
   * Gets the v parameter out of input url and returns it.
   * @param videoRaw - string value of the youtube video (example: https://www.youtube.com/watch?v=nWpSeuPzsKI).
   */
  processUrl(videoRaw:string) {
    let videoProcessed = videoRaw;

    if (videoProcessed.includes("https://")) {
      videoProcessed = videoProcessed.substring("https://".length, videoProcessed.length);
    }

    const videoId = this.router.parseUrl(videoProcessed).queryParamMap.get('v');
    return videoId;
  }
}
