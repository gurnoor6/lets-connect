import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public pictures=['https://cdn131.picsart.com/326902845047201.jpg?type=webp&to=crop&r=256','https://cdn5.picsart.com/5259562062.jpeg?type=webp&to=crop&r=256','https://cdn131.picsart.com/289094235017201.jpg?type=webp&to=crop&r=256',
  'https://www.ee.iitm.ac.in/comp_photolab/images/projects/underwaterDepth/2.jpg']
  constructor() { }

  ngOnInit(): void {
  }

}
