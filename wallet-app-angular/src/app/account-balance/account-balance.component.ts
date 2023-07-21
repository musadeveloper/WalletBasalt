import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {
  accountId = 0; // Replace with the actual account ID you want to fetch the balance for
  balance: number = 0;

  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit() {
    this.fetchAccountBalance();
  }

  fetchAccountBalance() {
    const loggedInAccountId = this.authService.getLoggedInAccountId();
  
    if (loggedInAccountId !== null && loggedInAccountId !== undefined) {
      const parsedAccountId = Number(loggedInAccountId);
      
      if (!isNaN(parsedAccountId) && parsedAccountId > 0) {
        this.accountId = parsedAccountId;
  
        this.accountService.getAccountBalance(this.accountId).subscribe(
          (balance) => {
            this.balance = balance;
          },
          (error) => {
            console.error('Error fetching account balance:', error);
          }
        );
      } else {
        console.error('Invalid account ID:', loggedInAccountId);
      }
    } else {
      console.error('User is not logged in.');
    }
  }
  
}