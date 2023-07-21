import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AccountCreationModel, AccountLoginModel } from './models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7274/api/Auth'; 
  private authTokenKey = 'authToken';
  private accountIdKey = 'accountId'; 

  constructor(private http: HttpClient, private router: Router) {}

  createAccount(accountModel: AccountCreationModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreateAccount`, accountModel);
  }

  login(accountNumber: string, password: string): Observable<any> {
    const loginModel: AccountLoginModel = { accountNumber: accountNumber, password: password };
    return this.http.post<any>(`${this.apiUrl}/Login`, loginModel);
  }

  handleSuccessfulLogin(response: any): void {
   
    const token = response.Token;
    const accountId = response.accountId; 
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.accountIdKey, accountId);

    
  }

  
  getLoggedInAccountId(): string | null {
    return localStorage.getItem(this.accountIdKey);
  }
}
