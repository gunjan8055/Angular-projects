
import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';
import { Video } from './video.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn : "root"
})

export class VideoService {

  error = new Subject<string>();
  constructor(private http : HttpClient) { }

    createAndStoredata(title : string, url : string, description : string){
        const data : Video = {
            title : title,
            url : url,
            description : description
        };
        this.http.post<{name : string}>('https://videoplayer-6405f.firebaseio.com/video.json',
        data, 
        {
            observe : 'response'   
        }).subscribe(responsedata => {
            console.log(responsedata);
        }, error => {
            this.error.next(error.message);
        });
    }
    
  getvideos()
  {
      let searchparams = new HttpParams();
      searchparams = searchparams.append('print', 'value');
      searchparams = searchparams.append('multiple', 'params');
      return this.http
        .get('https://videoplayer-6405f.firebaseio.com/video.json', {
            headers : new HttpHeaders({'Custom-Header' : 'Hello'}) ,
            params : searchparams
        })
            .pipe(
                map(responseData => {
                    const videoarray : Video[] = [];
                    for(const key in responseData)
                    {
                        if(responseData.hasOwnProperty(key))
                        {
                            videoarray.push({...responseData[key],
                            id : key});
                        }
                    }
                    return videoarray;
                }),
                catchError(errorres => {
                   return throwError(errorres);
                }) 
            );
  }

  deletevideo(video : Video)
  {
    return this.http.delete('https://videoplayer-6405f.firebaseio.com/video.json', {
        observe : 'events'
    })
        .pipe(
            tap(event => {
                console.log(event);
                if(event.type === HttpEventType.Sent) {                   
                    
                }
                if(event.type === HttpEventType.Response) {
                    console.log(event.body);
                }              
            })
        )
  }
}
