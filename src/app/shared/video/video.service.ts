import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StorageService} from '../storage.service';

@Injectable()
export class VideoService {
  currentVideoId: string = "";
  newVideo = new BehaviorSubject(this.currentVideoId);


  constructor(private storageService: StorageService) {
    this.currentVideoId = this.storageService.getVideo();
  }

  /**
  * Saves video as new video in data feed
  * @param id - v parameter in "https://www.youtube.com/watch?v=Fdf5aTYRW0E"
  */
  saveVideo(id: string) {
    this.currentVideoId = id;
    this.newVideo.next(this.currentVideoId);
    this.storageService.saveVideo(id);
  }
}
