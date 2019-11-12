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

  videoSaved = false;

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
    const videoRaw = this.videoForm.value.videoLocation;
    this.videoService.saveVideo(videoRaw);
    this.videoSaved = true;
  }

}
