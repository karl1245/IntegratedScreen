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
  videoLocation: string;
  videoForm: FormGroup;
  errorMessage: string;

  constructor(private videoService: VideoService,
              private router: Router) { }

  ngOnInit() {
    this.videoLocation = "";
    this.videoForm = new FormGroup({
      'videoLocation': new FormControl(this.videoLocation)
    });
  }

  onSaveVideo(){
    let videoRaw = this.videoForm.value.videoLocation;
    if (videoRaw.substring(0, "https://".length) == "https://") {
      videoRaw = videoRaw.substring("https://".length, videoRaw.length);
    }
    let video = this.router.parseUrl(videoRaw).queryParamMap.get('v');
    this.videoService.changeMessage(video);
  }

}
