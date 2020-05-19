import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserdataService {
  
  // host = "http://localhost:8000";
  host = 'https://connectlets3.pythonanywhere.com';


  private profilepicture="https://www.innonthesquare.com/resourcefiles/mobilehomeimages/inn-on-the-square-falmouth-massachusetts-mobile.jpg";
  private username="";
  constructor() { }

  map = new Map();
  getHost():string{
    return this.host;
  }

  getProfilePicture(username):string{

  	return localStorage.getItem(username);
  }

  setProfilePicture(username,address):void{
    
    localStorage.setItem(username,address);
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

  setTitle(str):void{
    localStorage.setItem("title",str);
  }

  getTitle():string{
    return localStorage.getItem("title");
  }

  setDescription(str):void{
    localStorage.setItem("description",str);
  }

  getDescription():string{
    return localStorage.getItem("description");
  }

}
