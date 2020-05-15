import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserdataService {
  
  private profilepicture="https://www.innonthesquare.com/resourcefiles/mobilehomeimages/inn-on-the-square-falmouth-massachusetts-mobile.jpg";
  private username="";
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
  }

  setBlankUser(){
    localStorage.setItem("currentUser","");
  }
}
