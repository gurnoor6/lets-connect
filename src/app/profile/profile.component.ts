import { Component, OnInit } from '@angular/core';
import {UserdataService} from '.././userdata.service';
import {PostService} from '.././services/post.service';
import {ActivatedRoute,Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilepic="";
  username="";
  public pictures=[];
  dNone=false;
  uploadSuccess=false;
  adminAccess=false;
  titleChangeBox = false;
  title="Your official Page!"


  constructor(private ud:UserdataService, private postservice:PostService,private router:Router,
  	private route:ActivatedRoute) { }

  ngOnInit(): void {
  	if(window.location.href.includes("profile")){
  		this.username = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  	}
  	else{
  		this.username = this.ud.getCurrentUser();
  		window.location.href=window.location.href+'profile/'+this.username;
  		console.log(this.username);
  	}

  	if (this.username==this.ud.getCurrentUser())
  		this.adminAccess=true;

  	this.profilepic=this.ud.getProfilePicture(this.username);
  	console.log(this.profilepic);
  	this.postservice.getPictures(this.username)
  					.subscribe(response=>{
  						for(let entry of (response as any)){
  							this.pictures.push("http://localhost:8000"+entry['picture']);
  						}	  					
  					});
  }



    fileToUpload :File=null;
	handleFileInput(files:FileList,autoUpdate=0){
		this.fileToUpload = files.item(0);
		if(this.dNone)
			this.onSubmit('profilepicture','update/');
		if(autoUpdate==1){
			this.onSubmit('picture','upload/');
		}
	}

	onSubmit(tag,loc){
		const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append(tag,this.fileToUpload,this.fileToUpload.name);
		this.postservice.create('http://localhost:8000/'+loc,formData)
			.subscribe(response=>{
				if(response['response']=='pass')
					this.uploadSuccess=true;
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

	 onUploadClick(){
	 	document.getElementById('image').click();
	 }

	 changeTitleTrigger(){
	 	this.titleChangeBox?this.titleChangeBox=false:this.titleChangeBox=true;
	 }







}
