import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import {PostService} from '.././services/post.service';
import {User} from './user-interface';
import {UserdataService} from '.././userdata.service';
import {ActivatedRoute,Router} from '@angular/router';

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
  host="";

  constructor(private service:PostService, private ud:UserdataService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.host=this.ud.getHost();
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
  	this.service.create(this.host+'/login/',formdata).subscribe(response=>{
  		if (response['response']=='fail'){
  			this.validationFailed=true;
  		}
  		else{
  			this.username.emit(response[0]['username']);
  			this.loggedIn.emit(true);
        this.router.navigate(['profile/'+response[0]['username']],{relativeTo:this.route});
        this.ud.setCurrentUser(response[0]['username']);
        this.ud.setLoginStatus("true");
        this.ud.setTitle(response[0]['title']);
        this.ud.setDescription(response[0]['description']);

  		}
  	},
  	error=>{console.log("error occured");});
  }
  

 

}
