import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { VideoService } from '../../shared/video/video.service';

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.css']
})
export class VideoAdminComponent implements OnInit {
  videoLocation: string;
  videoForm: FormGroup;
  



  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoLocation = "";
    this.videoForm = new FormGroup({
      'videoLocation': new FormControl(this.videoLocation)
    });
    
    
    
  }

  onSaveVideo(){
    this.videoService.changeMessage(this.videoForm.value.videoLocation)
  }

}
