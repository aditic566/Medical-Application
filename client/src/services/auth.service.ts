

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;
  private isLoggedIn: boolean = false;
  

  constructor() { 
    console.log("in auth servie");
    this.loadToken();
  }

  // Method to save token received from login
  saveToken(token: string) {
    //please complete this
    this.token = token;
    localStorage.setItem('token', token);
    this.isLoggedIn = true;
  }

  setRole(role: any) {
    //please complete this
    localStorage.setItem('role', role);
  }

  get getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Method to retrieve login status
  get getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  setLoginStatus() : any {
    this.isLoggedIn = true;
  }

  getToken(): string | null {
    //please complete this
    if (this.token) {
      return this.token;
    }
    return localStorage.getItem('token');
  }


  logout() {
    //please complete this
    this.token = null;
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  private loadToken(){
    const token = localStorage.getItem('token');
    if(token){
      this.token=token;
      this.isLoggedIn=true;
    }
  }
}



