import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoService } from '../../shared/video/video.service';
import {MatDialog} from '@angular/material';
import {InformationModalComponent} from '../information-modal/information-modal.component';

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.css', '../admin-screen.component.css']
})
export class VideoAdminComponent implements OnInit {
  videoForm: FormGroup;
  errorMessage: string;

  videoSaved = false;

  constructor(private videoService: VideoService, public dialog: MatDialog) { }

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
    const header = "Hello World!";
    const info = " Android is an open source software stack created for a wide array of devices with different form factors. Android's primary purpose is to create an open software platform available for carriers, OEMs, and developers to make their innovative ideas a reality and to introduce a successful, real-world product that improves the mobile experience for users.\n" +
      "\n" +
      "Android is designed so that there's no central point of failure, where one industry player restricts or controls the innovations of another. The result is a full, production-quality consumer product with source code open for customization and porting. ";
    const dialogRef = this.dialog.open(InformationModalComponent, {
      width: '250px',
      data: {header: header, info: info}
    });
  }

}
