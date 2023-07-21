import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountLoginModel } from '../models/account.model';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent {
  loginModel: AccountLoginModel = {
    accountNumber: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  navigateToAccountCreation() {
    this.router.navigate(['/account-creation']); 
  }

  onSubmit(): void {
    this.authService.login(this.loginModel.accountNumber, this.loginModel.password)
      .subscribe(
        response => {
          
          this.authService.handleSuccessfulLogin(response);
          this.router.navigate(['/account-home']); 
        },
        error => {
          console.error('Login failed:', error);
          
        }
      );
  }
}
