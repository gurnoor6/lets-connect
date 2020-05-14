import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router){}

  title = 'letsconnect';
  currentState="Log In";
  loggedIn=false;
  register=false;
  username="";

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



}
