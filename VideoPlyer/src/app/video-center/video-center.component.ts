import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { VideoService } from '../video.service';
import { Video } from '../video.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit, OnDestroy {

  videos : Video[] = [];
  selectedvideo : any;
  hiddenform = true;
  error = null;
  private errorsub : Subscription;
  constructor(private http : HttpClient,private _videoservice : VideoService) { }

  ngOnInit() {
    this.errorsub = this._videoservice.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    // this._videoservice.getvideos().subscribe(error => {
    //   this.error = error.message;
    // });
}
clickonnew(){
  this.hiddenform = false;
}

OnCreatePost(postData : {title : string, url : string, description : string})
{
  this.hiddenform = true;
  this._videoservice.createAndStoredata(postData.title, postData.url,postData.description);
}


  onFetchPosts()
  {
    this.hiddenform = true;
    this._videoservice.getvideos()
    .subscribe(allvideo => {
      this.videos = allvideo;
    }, error => {
      this.error = error.message;
    });
  }

  onSelectVideo(video : any)
  {
    this.hiddenform = true;
    this.selectedvideo = video;
    console.log(this.selectedvideo);
  }
  onDeleteVideoevent(video : any)
  {
    let videoarray = this.videos;
    this._videoservice.deletevideo(video)
      .subscribe(resdeletedvideo => {
        for(let i=0; i<videoarray.length; i++)
        {
          if(videoarray[i].id === video.id)
          {
            videoarray.slice(i,1);
            console.log(videoarray);
            
          }
        }
      });
      this.selectedvideo = null;
      this.videos = null;
  }
  
  onHandleerror()
  {
    this.error = null;
  }

  ngOnDestroy()
  {
    this.errorsub.unsubscribe();
  }
}
