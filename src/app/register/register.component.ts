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
	console.log(this.userForm);
	this.service.create('http://localhost:8000/profile/',this.userForm)
		.subscribe(response=>{
			console.log(response);
		});
 	 }

}
