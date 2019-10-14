import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VideoService {
  currentVideoId: string = "Fdf5aTYRW0E";
  newVideo = new BehaviorSubject(this.currentVideoId);



  constructor() { }

  /**
  * Saves video as new video in data feed
  * @param id - v parameter in "https://www.youtube.com/watch?v=Fdf5aTYRW0E"
  */
  saveVideo(id: string) {
    this.currentVideoId = id;
    this.newVideo.next(this.currentVideoId);
  }
}
