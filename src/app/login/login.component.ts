import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import {PostService} from '.././services/post.service';
import {User} from './user-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  posts;
  public myemail="";
  public mypassword="";
  public user:User;
  public validationFailed=false;

  constructor(private service:PostService) { }

  ngOnInit(): void {
  }

  log(){
  	console.log(this.myemail);
  }

  @Output() loggedIn = new EventEmitter <boolean>();
  @Output() username = new EventEmitter <string>();
  onSubmit(){
  	const formdata:FormData = new FormData;
  	formdata.append('email',this.myemail);
  	formdata.append('password',this.mypassword);
  	this.service.create('http://localhost:8000/login/',formdata).subscribe(response=>{
  		if (response['response']=='fail'){
  			this.validationFailed=true;
  		}
  		else{
  			this.username.emit(response[0]['username']);
  			this.loggedIn.emit(true);
  		}
  	},
  	error=>{console.log("error occured");});
  }
  

 

}
