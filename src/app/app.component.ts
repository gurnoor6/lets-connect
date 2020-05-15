import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserdataService} from './userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router,private ud:UserdataService){}

  currentuser="hello";
  ngOnInit(): void {
  	setInterval(()=>{this.checkProfile()},100);
    setInterval(()=>{this.setUsername()},100);
    
  }

  title = 'letsconnect';
  currentState="Log In";
  loggedIn=false;
  register=false;
  visitor=false;

  isLoggedIn(logged:boolean){
  	logged ? this.currentState="Log Out" : this.currentState="Log In";
  	this.loggedIn=logged;
  }


  setUsername(){
     this.currentuser=this.ud.getCurrentUser();
  }


  Register(){
  	this.register=true;
    this.visitor=false;
  }

  resetUsername(){
    this.ud.removeCurrentUser();
  }

  checkProfile(){
    if(window.location.href.includes("profile")){
      this.visitor=true;
    }
    else
      this.visitor=false;
  }

  toggleVisitor(){
    this.visitor=false;
  }



}
