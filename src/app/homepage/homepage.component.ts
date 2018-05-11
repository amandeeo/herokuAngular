import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails} from '../authentication.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

	
	details:UserDetails = {
   _id:'',
	name:'',
	email:'',
	age:'',
  }

  public token:string;

  constructor(public auth:AuthenticationService) { }

  ngOnInit() {
  	this.getDetails();
  }
 edit=true;
 show=true;
 toggleshow()
 {
   this.show=!this.show;
   this.edit=!this.edit;
 }
 getDetails(){

  	this.auth.userDetails().subscribe((data:any)=> {
  		console.log(data,"data on get userDetails");
  		this.details = data.data;
  		console.log(this.details,"userdetail")
  		this.details
  	},err => {
  		console.log(err,"error on get user details");
  	})
  }
}
