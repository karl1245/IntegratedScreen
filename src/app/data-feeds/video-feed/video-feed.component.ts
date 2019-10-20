import { Component, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import { VideoService } from '../../shared/video/video.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css', '../data-feeds.component.css']
})
export class VideoFeedComponent implements OnInit {
  
  id: string;
  playerVars = {
    cc_lang_pref: 'en',
    autoplay: 1,
    loop: 1,
    playlist: this.id

  };
  videoSub: Subscription;

  private player;
  private ytEvent;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.id = this.videoService.currentVideoId;
    this.videoSub = this.videoService.newVideo.subscribe(videoId => {
      this.id = videoId;
      this.playerVars.playlist = videoId;
    });
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

}
