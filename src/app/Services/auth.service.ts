import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Route, Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router,private alertifyService:AlertifyService) { }
  path = "https://localhost:7176/api/Auth";
  userToken:any;
  decodedToken:any;
  helper = new JwtHelperService();
  TOKEN_KEY="token"
  login(loginuser:LoginUser){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
      this.httpClient.post(this.path+"/login",loginuser,{headers:headers}).subscribe((data:any) =>{
      this.saveToken(data.token);
      this.userToken=data;
      this.decodedToken= this.helper.decodeToken(data.token.toString());
      //this.alertifyService.success("Giriş Başarılı");
      this.router.navigateByUrl("/home");
    });
  }
  register(registerUser:RegisterUser){
    let headers = new HttpHeaders();
    headers.append("Content-Type","application/json");
    this.httpClient.post(this.path+"/register",registerUser,{headers:headers})
    .subscribe(data =>{

    });
  }
  saveToken(token:any){
    localStorage.setItem(this.TOKEN_KEY,token)
  }
  logout(){
    localStorage.removeItem(this.TOKEN_KEY)
  }
  loggedIn(){
    return this.helper.isTokenExpired(this.TOKEN_KEY)
  }
  getCurrentUserId(){
    if(localStorage.getItem(this.TOKEN_KEY)){
     return this.helper.decodeToken(this.token).userId
    }
  }
  get token(){
    if(localStorage.getItem(this.TOKEN_KEY)){
      return this.helper.decodeToken().userId
     }
  }
}