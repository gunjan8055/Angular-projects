import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  @Input() videos;
  @Output() deletevideoevent = new EventEmitter();
  public editTitle : boolean = false;
  constructor() { }
  
  ngOnInit() {
    //console.log(videos);
  }
  
  ngOnChanges()
  {
    this.editTitle = false;
  }

  onTitleClick()
  {
    this.editTitle = true;
  }

  deletevideo()
  {
    this.deletevideoevent.emit(this.videos);
  }
}
