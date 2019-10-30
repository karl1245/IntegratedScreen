import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoService } from '../../shared/video/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.css', '../admin-screen.component.css']
})
export class VideoAdminComponent implements OnInit {
  videoForm: FormGroup;
  errorMessage: string;

  constructor(private videoService: VideoService,
              private router: Router) { }

  ngOnInit() {
    const currentVideoId = this.videoService.currentVideoId;
    this.videoForm = new FormGroup({
      'videoLocation': new FormControl(
        currentVideoId != "" ? "https://www.youtube.com/watch?v=" + currentVideoId : "")
    });
  }

  onSaveVideo(){
    let videoRaw = this.videoForm.value.videoLocation;
    if (videoRaw.substring(0, "https://".length) == "https://") {
      videoRaw = videoRaw.substring("https://".length, videoRaw.length);
    }
    const videoId = this.router.parseUrl(videoRaw).queryParamMap.get('v');
    this.videoService.saveVideo(videoId);
  }

}
