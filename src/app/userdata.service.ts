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
  	var newaddress = "http://localhost:8000"+<string>address;
  	this.map.set(username,newaddress);
  }

  getProfilePicture(username):string{
  	return this.map.get(username);
  }

  setUsername(name):void{
  	this.username=name;
  }

  getUsername():string{
  	return this.username;
  }
}
