import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
  import { Video } from '../video.model';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  //outputs : ['SelectVideo']
})
export class VideoListComponent implements OnInit {

  @Input() video;

  @Output() SelectVideo = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  Onselect(vid : any)
  {
    this.SelectVideo.emit(vid);
  }
}
