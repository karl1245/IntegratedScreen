import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoService } from '../../shared/video/video.service';
import {MatDialog} from '@angular/material';
import {InfoModalService} from '../../shared/info-modal.service';

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
              public dialog: MatDialog,
              public infoModalService: InfoModalService) { }

  ngOnInit() {
    const currentVideo = this.videoService.getVideoRaw();
    this.videoForm = new FormGroup({
      'videoLocation': new FormControl(
        currentVideo != "" ? currentVideo : "")
    });
  }

  onSaveVideo(){
    const videoRaw = this.videoForm.value.videoLocation;
    this.videoService.saveVideo(videoRaw);
    this.videoSaved = true;
  }

  openInfo() {
    this.infoModalService.openInfoVideo(this.dialog);
  }
}
