import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn : 'root'
})
export class PostsService{

    constructor(private http : HttpClient){}
    createAndStorePost(title : string, content : string)
    {
        const postData : Post = {
            title: title,
            content : content
        };
        this.http.post<{ name : string }>('https://ng-complete-guide-d6a87.firebaseio.com/posts.json',
        postData).subscribe(resresponseData => {
        console.log(resresponseData);
    });
    }
    GetData()
    {
        return this.http
            .get<{ [key : string] : Post}>('https://ng-complete-guide-d6a87.firebaseio.com/posts.json')
            .pipe(
            map(responseData => {
            const postArray : Post[] = [];
            for(const key in responseData)
            {
              if(responseData.hasOwnProperty(key))
              {
                postArray.push({...responseData[key], id: key});
              }
            }
            return postArray;
          }))
    }

    deletePosts()
    {
       return this.http.delete('https://ng-complete-guide-d6a87.firebaseio.com/posts.json');
    }
    }