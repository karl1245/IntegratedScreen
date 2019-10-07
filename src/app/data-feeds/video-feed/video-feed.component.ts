import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css']
})
export class VideoFeedComponent implements OnInit {
  title = 'IntegratedScreen';
  id = 'Bey4XXJAqS8';
  playerVars = {
    cc_lang_pref: 'en'
  };
  private player;
  private ytEvent;

  constructor() { }

  ngOnInit() {
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
