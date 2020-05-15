import { Component, OnInit } from '@angular/core';
import {UserdataService} from '.././userdata.service';
import {PostService} from '.././services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilepic="";
  username;
  public pictures=[]
  constructor(private ud:UserdataService, private postservice:PostService) { }

  ngOnInit(): void {
  	this.profilepic=this.ud.getProfilePicture();
  	this.username = this.ud.getUsername();
  	this.postservice.getPictures(this.username)
  					.subscribe(response=>{
  						for(let entry of (response as any)){
  							this.pictures.push("http://localhost:8000"+entry['picture']);
  						}	  					
  					});
  }



    fileToUpload :File=null;
	handleFileInput(files:FileList){
		this.fileToUpload = files.item(0);
	}

	onSubmit(){
		const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append('picture',this.fileToUpload,this.fileToUpload.name);
		this.postservice.create('http://localhost:8000/upload/',formData)
			.subscribe(response=>{
				console.log(response);
			});
	 }









}
