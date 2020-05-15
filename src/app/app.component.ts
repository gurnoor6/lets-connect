import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router){}


  ngOnInit(): void {
  	setInterval(()=>{this.checkProfile()},100)
  }

  title = 'letsconnect';
  currentState="Log In";
  loggedIn=false;
  register=false;
  username="";
  visitor=false;

  isLoggedIn(logged:boolean){
  	logged ? this.currentState="Log Out" : this.currentState="Log In";
  	this.loggedIn=logged;
  }

  Register(){
  	this.register=true;
  	console.log(this.register);
  }

  getUsername(user:string){
  	this.username = user;
  }

  checkProfile(){
    
    // window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
    if(window.location.href.includes("profile")){
      this.visitor=true;
    }
    else
      this.visitor=false;
  }



}
