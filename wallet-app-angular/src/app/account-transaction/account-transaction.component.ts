import { Component, OnInit } from '@angular/core';
 
import { TransactionHistoryModel } from '../models/account.model';
import { AccountService } from '../account.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.css'],
})
export class AccountTransactionComponent implements OnInit {
  transactionHistory: TransactionHistoryModel | null = null;
  accountId: number; 

  constructor(private accountService: AccountService,  private authService: AuthService) {
    this.accountId = Number(this.authService.getLoggedInAccountId());
    console.log('Acc number:', this.accountId);
  }

  ngOnInit(): void {
    this.fetchTransactionHistory();
  }

  fetchTransactionHistory(): void {
    this.accountService.getTransactionHistory(this.accountId).subscribe(
      (data) => {
        this.transactionHistory = data;
      },
      (error) => {
        console.error('Error fetching transaction history:', error);
      }
    );
  }
}
