import { Component, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import { VideoService } from '../../shared/video/video.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css', '../data-feeds.component.css']
})
export class VideoFeedComponent implements OnInit {
  title = 'IntegratedScreen';
  id = 'Bey4XXJAqS8';
  playerVars = {
    cc_lang_pref: 'en'
  };
  videosub: Subscription;

  private player;
  private ytEvent;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
   this.videosub = this.videoService.currentMessage.subscribe(message => this.id = message)
   
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
