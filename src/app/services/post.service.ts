import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserdataService} from '../userdata.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  

  constructor(private httpClient:HttpClient, private ud:UserdataService) {}
  private host = this.ud.getHost();

  private url = this.host+'/login/';

   getPosts(data){
      return this.httpClient.get(this.url+'?email='+data.email+'&password='+data.password);
    }

  getPictures(username,url=this.host+'/upload/'){
    return this.httpClient.get(url+'?username='+username);
  }

    create(url,post){
      return this.httpClient.post<any>(url,post);
    }
}
