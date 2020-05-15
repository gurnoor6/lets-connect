import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private profilepicture="https://www.innonthesquare.com/resourcefiles/mobilehomeimages/inn-on-the-square-falmouth-massachusetts-mobile.jpg";
  private username="";
  constructor() { }

  setProfilePicture(address):void{
  	var newaddress = "http://localhost:8000"+<string>address;
  	this.profilepicture = newaddress;
  }

  getProfilePicture():string{
  	return this.profilepicture;
  }

  setUsername(name):void{
  	this.username=name;
  }

  getUsername():string{
  	return this.username;
  }
}
