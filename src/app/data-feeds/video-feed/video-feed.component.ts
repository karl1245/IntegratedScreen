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
  videoUrl: string;
  videoSub: Subscription;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.id = this.videoService.currentVideoId;
    this.videoSub = this.videoService.newVideo.subscribe(videoId => {
      this.id = videoId;
      this.videoUrl = "https://www.youtube.com/embed/" + this.id;
      this.videoUrl += ("?playlist=" + this.id);
      this.videoUrl += "&controls=0";
      this.videoUrl += "&loop=1";
      this.videoUrl += "&autoplay=1";
      this.videoUrl += "&modestbranding=1";
      this.videoUrl += "&rel=0";
    });
  }
}
