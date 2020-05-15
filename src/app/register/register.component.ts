import { Component, OnInit } from '@angular/core';
import {NewUser} from './new-user-interface';
import {PostService} from '.././services/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:PostService) { }

  ngOnInit(): void {

  }

userForm = new NewUser('','','');
fileToUpload :File=null;
handleFileInput(files:FileList){
	this.fileToUpload = files.item(0);
}

 onSubmit(){
 	const formData = new FormData();
 	formData.append('email',this.userForm.email);
 	formData.append('password',this.userForm.password);
 	formData.append('username',this.userForm.username);
 	formData.append('profilepicture',this.fileToUpload,this.fileToUpload.name);
	this.service.create('http://localhost:8000/profile/',formData)
		.subscribe(response=>{
			console.log(response);
		});
 	 }

}
