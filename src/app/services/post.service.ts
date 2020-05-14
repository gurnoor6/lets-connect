import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:8000/login/';

  constructor(private httpClient:HttpClient) {}

   getPosts(data){
      return this.httpClient.get(this.url+'?email='+data.email+'&password='+data.password);
    }

    create(url,post){
      return this.httpClient.post<any>(url,post);
    }
}
