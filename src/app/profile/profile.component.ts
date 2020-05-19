import { Component, OnInit } from '@angular/core';
import {UserdataService} from '.././userdata.service';
import {PostService} from '.././services/post.service';
import {ActivatedRoute,Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {Picture,Notification} from './picture-interface';
import{showCaption,fader} from './profile-animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations:[
  	showCaption,
  	fader
  ],
})
export class ProfileComponent implements OnInit {

  host="";
  profilepic="";
  username="";
  pictures:Picture[]=[];
  dNone=false;
  uploadSuccess=false;
  adminAccess=false;
  titleChangeBox = false;
  title="Hello World";
  titleChangeSuccess=false;
  descriptionChangeBox=false;
  description="Hello World!"
  descriptionChangeSuccess=false;
  caption="";
  textDisplay=true;
  followers=0;
  displayFollow=true;
  showFollowersToggler=false;
  showFollowingToggler=false;
  followersList="";
  following=0;
  followingList="";
  posts=0;
  editUploads=false;
  notifications="";
  notifications_2:Notification[]=[];	//Basically with date stamp
  showNotifications=false;


  constructor(private ud:UserdataService, private postservice:PostService,private router:Router,
  	private route:ActivatedRoute) { }

  ngOnInit(): void {
  	this.host=this.ud.getHost();
  	if(window.location.href.includes("profile")){
  		this.username = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  	}
  	else{
  		this.username = this.ud.getCurrentUser();
  		window.location.href=window.location.href+'profile/'+this.username;
  	}

  	if (this.username==this.ud.getCurrentUser())
  		this.adminAccess=true;

  	this.postservice.getPictures(this.username)
  					.subscribe(response=>{
  						for(let entry of (response as any)){
  							var pic = {location:this.host+entry['picture'],caption:entry['caption'],state:'image',text:"false"};
  							this.pictures.push(pic);
  							this.posts++;
  						}	  					
  					});


  	//statements here are used to fill the user specific data from database. 
  	const formData = new FormData();
  	formData.append('username',this.username)
  	this.postservice.create(this.host+"/getUserData/",formData).subscribe(
  		response=>{
  			this.description = response[0]['description'];
  			this.title = response[0]['title'];
  			this.followers = +response[0]['followers'];
  			if(response[0]['followerNames'].includes(this.ud.getCurrentUser())){
  				this.displayFollow=false;
  			}
  			this.followersList = response[0]['followerNames'].replace(","," ");
  			this.following = +response[0]['following'];
  			this.followingList = response[0]['followingNames'].replace(","," ");
  			this.profilepic = this.ud.getHost()+response[0]['profilepicture'];
  			this.notifications = response[0]['notifications'].split('\n').reverse();
  			this.prepareNotifications();
  		})
  }


  //split notification  into date and content.
  prepareNotifications(){
  	for(let entry of this.notifications){
  		if(entry!=""){
  			let e = entry.split('\t');
  			this.notifications_2.push({text:e[1],date:e[0]});
  		}
  	}
  }


    fileToUpload :File=null;
	handleFileInput(files:FileList,autoUpdate=0){
		this.fileToUpload = files.item(0);
		if(this.dNone)
			this.onSubmit('profilepicture','update/');
		if(autoUpdate==1){
			this.onSubmit('picture','upload/',this.caption);
		}
	}

	onSubmit(tag,loc,caption=""){
		const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append(tag,this.fileToUpload,this.fileToUpload.name);
	 	if(caption!=""){
	 		formData.append('caption',this.caption);
	 	}
		this.postservice.create(this.host+'/'+loc,formData)
			.subscribe(response=>{
				if(response['response']=='pass')
					this.uploadSuccess=true;
			});
	 }

	 onImgClick(){
	 	this.dNone=true;
	 	if(this.adminAccess)
	 		document.getElementById('profile-image').click();
	 }

	 deleteUser(){
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	this.postservice.create(this.host+'/delete/',formData)
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

	 changeTitle(){
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append('title',this.title);
	 	this.postservice.create(this.host+'/updateTitle/',formData)
	 					.subscribe(response=>{
	 						this.changeTitleTrigger();
	 						this.titleChangeSuccess=true;
	 						this.ud.setTitle(this.title);
	 					});
	 }

	 changeDescription(){
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append('description',this.description);
	 	this.postservice.create(this.host+'/updateDescription/',formData)
	 					.subscribe(response=>{
	 						this.changeDescriptionTrigger();
	 						this.descriptionChangeSuccess=true;
	 						this.ud.setDescription(this.description);
	 					});
	 }

	 changeDescriptionTrigger(){
	 	this.descriptionChangeBox?this.descriptionChangeBox=false:this.descriptionChangeBox=true;
	 }

	 changePicState(pic:Picture){
	 	pic.state=="text"?pic.state="image":pic.state="text";
	 	if(pic.state=="image"){
	 		pic.text="false";
	 		console.log(pic.text=='false')
	 	}
	 }

	 showPicText(event,pic){
	 	if(event['totalTime'] && event['toState']=='text'){

	 		pic.text="true";
	 	}
	 }

	 showEvent(event){
	 	console.log(event);
	 }

	 changeFollowers(x){
	 	this.followers+=x;
	 	if(x==1){
	 		this.displayFollow=false;
	 		if(this.followersList.trim()!=""){
	 			this.followersList = this.followersList + ","+this.ud.getCurrentUser();
	 		}
	 		else
	 			this.followersList = this.followersList +this.ud.getCurrentUser();

	 	}
	 	else{
	 		this.displayFollow=true;
	 		this.followersList = this.followersList.replace(","+this.ud.getCurrentUser(),"");
	 		this.followersList = this.followersList.replace(this.ud.getCurrentUser(),"");
	 	}
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append('value',x);
	 	formData.append('followerName',this.ud.getCurrentUser());
	 	//writing subscribe is essential here. otherwise data in database is not updated
	 	this.postservice.create(this.host+'/changeFollowers/',formData).subscribe();	
	 }

	 showProfileData(target:String){
	 	if(target=='followers'){
	 		this.showFollowingToggler=false;
	 		this.showFollowersToggler = this.showFollowersToggler ? this.showFollowersToggler=false: this.showFollowersToggler=true;
	 	}
	 	else if(target=='following'){
	 		this.showFollowersToggler=false;
	 		this.showFollowingToggler = this.showFollowingToggler ? this.showFollowingToggler=false: this.showFollowingToggler=true;
	 	}

	 	//wasn't intended initially but it fit well. So did here
	 	else if(target=='editUploads')
	 		this.editUploads = this.editUploads ? this.editUploads=false: this.editUploads=true;

	 	else if(target=='notifications'){
	 		this.showNotifications = true;
	 	}

	 	else if(target=='user-pics'){
	 		this.showNotifications=false;
	 	}
	 	
	 }

	 deletePic(pic:Picture){
	 	const formData = new FormData();
	 	formData.append('username',this.username);
	 	formData.append('pic',pic.location.replace(this.ud.getHost(),""));
	 	formData.append('caption',pic.caption);
	 	this.postservice.create(this.host+'/deletePic/',formData).subscribe(response=>{location.reload()});
	 }






}
