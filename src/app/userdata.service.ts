import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private profilepicture="https://www.innonthesquare.com/resourcefiles/mobilehomeimages/inn-on-the-square-falmouth-massachusetts-mobile.jpg";

  constructor() { }

  setProfilePicture(address):void{
  	var newaddress = address.replace("4200","8000");
  	this.profilepicture = newaddress;
  }

  getProfilePicture():string{
  	return this.profilepicture;
  }
}
