import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { TransactionModel } from '../models/account.model';
import { AuthService } from '../auth.service'; 
@Component({
  selector: 'app-account-debit',
  templateUrl: './account-debit.component.html',
  styleUrls: ['./account-debit.component.css']
})
export class AccountDebitComponent {
  amount: number = 0;
  accountId: number; 

  constructor(private accountService: AccountService, private authService: AuthService) {
    this.accountId = Number(this.authService.getLoggedInAccountId()); 
  }

  onSubmit(): void {
    if (this.amount > 0) {
      const debitModel: TransactionModel = {
        AccountId: this.accountId,
        Amount: this.amount,
        Type: 'Debit',
        TransactionDate: new Date()
      };

      this.accountService.debitAccount(this.accountId, debitModel)
        .subscribe(
          (transaction) => {
            
            this.amount = 0;
          },
          (error) => {
            
          }
        );
    } else {
      console.warn('Invalid amount. Please enter a positive number.');
    }
  }
}
