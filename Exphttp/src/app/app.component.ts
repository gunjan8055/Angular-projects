import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedpost : Post[] = [];
  isLoading = false;
  constructor(private http : HttpClient, private postservice : PostsService){
  }

  ngOnInit(){
    this.isLoading = true;
    this.postservice.GetData().subscribe(posts => {
      this.isLoading = false;
      this.loadedpost = posts;
    });
  }

  OnCreatePost(postData : {title : string, content : string})
  { 
    this.postservice.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts()
  {
    this.isLoading = true;
    this.postservice.GetData().subscribe(posts => {
      this.isLoading = false;
      this.loadedpost = posts;
    });
  }

  onClearPosts(){
    this.postservice.deletePosts().subscribe(() => {
      this.loadedpost = [];
    });
  }
}
