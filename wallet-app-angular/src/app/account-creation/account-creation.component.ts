import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountCreationModel } from '../models/account.model';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent {
  newAccount: AccountCreationModel = {
    accountNumber: '',
    accountHolderName: '',
    initialBalance: 0,
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  navigateToAccountLogin() {
    this.router.navigate(['/account-login']); 
  }

  onSubmit() {
    this.authService.createAccount(this.newAccount).subscribe(
      (response) => {
       
        this.router.navigate(['/login']);
      },
      (error) => {
        
      }
    );
  }
}
