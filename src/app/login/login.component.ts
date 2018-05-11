import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials:TokenPayload = {
    email : '',
    name: '',
    age:'',
    password: '',
    confirm_password:''
  }

	public disableLogin : boolean = false;
  public payload : string;
  public token : string;
  public errorMessage:string;
  public checked:boolean;
  public cookieValue:string;


  constructor(public auth:AuthenticationService,public router:Router,private cookieService: CookieService) { }

  ngOnInit() {
    //checking if there is cookie exists
     this.cookieValue = localStorage.getItem('last_unload');
    if(this.cookieValue){
      console.log(this.cookieValue,"this.cookieValue");
      //decrypting 
      var bytes  = CryptoJS.AES.decrypt(this.cookieValue.toString(), 'secret key 123');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData[0].email,"decryptedData");
      this.credentials.email = decryptedData[0].email;
      this.credentials.password =decryptedData[1].password;
      console.log(this.credentials,"dec");
      this.router.navigate(['/home']);
    }
  }
//switch forms from login to sign up and vice-versa
  switchForm(){
  	this.disableLogin = !this.disableLogin;
  }

  //Function to execute signup

  signingUp(){
   
    if(this.credentials.password != this.credentials.confirm_password){
       Swal('Error!', 'Password and confirm password must be same', 'error');
      console.log("Password and confirm password does not matched");
    }

    else{
      this.auth.register(this.credentials).subscribe(() => {
         Swal('Congratulations', 'Registeration successful', 'success');
        this.disableLogin = false;
      },(err) => {
        this.errorMessage = err.error.error;
        Swal('Error!', this.errorMessage, 'error');
      });
     }
  }

//function to execute at time of login

  loggingIn(){
    if(this.checked){
       console.log("hello");
      var data = [{'email': this.credentials.email}, {'password': this.credentials.password}]
      console.log(data,"data");

     // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
      console.log(ciphertext.toString(),"ciphertext");
      
      //storing encrypted data into cookie
      localStorage.setItem( 'last_unload', ciphertext.toString());
    }

    this.auth.login(this.credentials).subscribe((data : any)=> {
       this.auth.saveToken(data.token);
       this.router.navigate(['/home']);
    },
    (err) => {
      this.errorMessage = err.error.error;
      Swal('Error!', this.errorMessage, 'error');
    })
    console.log("credentials",this.credentials.email);
  }

  toggleEditable(event) {
     if ( event.target.checked ) {
         this.checked = true;
    }
    else{
      this.checked = false;
}
      console.log(this.checked ,"this.checked ")

}
}
