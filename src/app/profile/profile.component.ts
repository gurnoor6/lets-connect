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
  public pictures=[];
  dNone=false;
  constructor(private ud:UserdataService, private postservice:PostService) { }

  ngOnInit(): void {
  	this.username = this.ud.getUsername();
  	this.profilepic=this.ud.getProfilePicture(this.username);
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
		if(this.dNone)
			this.onSubmit('profilepicture','update/');
	}

	onSubmit(tag,loc){
		const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append(tag,this.fileToUpload,this.fileToUpload.name);
		this.postservice.create('http://localhost:8000/'+loc,formData)
			.subscribe(response=>{
				console.log(response);
			});
	 }

	 onImgClick(){
	 	this.dNone=true;
	 	document.getElementById('profile-image').click();
	 }

	 deleteUser(){
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	this.postservice.create('http://localhost:8000/delete/',formData)
	 					.subscribe(response=>{
	 						console.log(response);
	 					});
	 }









}
