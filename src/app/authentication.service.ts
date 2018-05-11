import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

export interface UserDetails {
	_id:string,
	name?:string,
	email:string,
	age?:string,
	
}

export interface TokenPayload {
	name?:string ,
	email:string,
  age?:string,
	password:string,
  confirm_password?:string
}

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

	private token:string;
  private status:string;

  constructor(public http:HttpClient, public router:Router) { }

//save token in localstorage
  public saveToken(token:string):void {
  	localStorage.setItem('auth-token',token);
  	this.token = token;
  }

//get token from localstorage
  public getToken():string {
  	if(!this.token){
  		this.token = localStorage.getItem('auth-token');
  	}
  	return this.token;
  }

//removes token on logout request
  public logout():void {
  	this.token = '';
  	window.localStorage.removeItem('auth-token');
    window.localStorage.removeItem('last_unload');
  	this.router.navigateByUrl('/');
  }

//
  public login(user:TokenPayload) : Observable<any> {
    return this.http.post('http://localhost:3000/api/login',user);

  }
  
  public register(user :TokenPayload) : Observable<any> {
    return this.http.post('http://localhost:3000/api/signup',user);
  }

  public userDetails() : Observable<any> {
    if(!this.token){
      this.token =  localStorage.getItem('auth-token');
     }
       let headers = new HttpHeaders();
      return this.http.get('http://localhost:3000/api/userdata', { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }


}
