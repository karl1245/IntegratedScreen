import { Component, OnInit } from '@angular/core';
import {Subscription, timer} from 'rxjs';
import { VideoService } from '../../shared/video/video.service';

@Component({
  selector: 'app-video-feed',
  templateUrl: './video-feed.component.html',
  styleUrls: ['./video-feed.component.css', '../data-feeds.component.css']
})
export class VideoFeedComponent implements OnInit {
  videoUrl: string;
  videoSub: Subscription;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoSub = this.videoService.newVideo.subscribe(videoUrl => {
      this.videoUrl = videoUrl;
    });
  }
}


