import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserdataService {
  
  private profilepicture="https://www.innonthesquare.com/resourcefiles/mobilehomeimages/inn-on-the-square-falmouth-massachusetts-mobile.jpg";
  private username="";
  private loginstatus="false";
  constructor() { }

  map = new Map();
  setProfilePicture(username,address):void{
  	
    localStorage.setItem(username,address);
  }

  getProfilePicture(username):string{

  	return localStorage.getItem(username);
  }

  setUsername(name):void{
  	this.username=name;
    
  }

  getUsername():string{
  	return this.username;
  }

  setCurrentUser(name):void{
    localStorage.setItem("currentUser",name);
  }

  getCurrentUser():string{
    return localStorage.getItem("currentUser");
  }

  removeCurrentUser():void{
    localStorage.removeItem("currentUser");
    localStorage.setItem("loginstatus","false");
  }

  setBlankUser(){
    localStorage.setItem("currentUser","");
  }

  setLoginStatus(str):void{
    localStorage.setItem("loginstatus",str);
  }

  getLoginStatus():string{
    return localStorage.getItem("loginstatus");
  }
}
