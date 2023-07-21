import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { TransactionModel } from '../models/account.model';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Component({
  selector: 'app-account-credit',
  templateUrl: './account-credit.component.html',
  styleUrls: ['./account-credit.component.css']
})
export class AccountCreditComponent {
  amount: number = 0;
  accountId: number;

 
  coinbaseCommerceApiKey = '7a5ae1b4-01f4-4b92-b471-57da122c0ce5';

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.accountId = Number(this.authService.getLoggedInAccountId());
  }

  onSubmit(): void {
    if (this.amount > 0) {
      const creditModel: TransactionModel = {
        AccountId: this.accountId,
        Amount: this.amount,
        Type: 'Credit',
        TransactionDate: new Date()
      };

      this.accountService.creditAccount(this.accountId, creditModel)
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

  creditWithCoinCommerce(): void {
    const payload = {
      name: 'Credit with CoinCommerce',
      description: 'Account credit using Coinbase Commerce',
      local_price: {
        amount: this.amount.toString(),
        currency: 'ZAR'
      },
      pricing_type: 'fixed_price',
      metadata: {
        accountId: this.accountId
      }
    };
  
    const headers = {
      'X-CC-Api-Key': this.coinbaseCommerceApiKey,
      'Content-Type': 'application/json'
    };
  
    // Replace 'YOUR_COINBASE_COMMERCE_CHECKOUT_URL' with the actual Coinbase Commerce checkout URL
    this.http.post<any>('https://commerce.coinbase.com/checkout/a81c4db1-388c-4ce8-b907-6237cd06213a', payload, { headers })
      .subscribe(
        (response) => {
          console.log('Response from Coinbase Commerce:', response);
          // Redirect the user to the Coinbase Commerce checkout page, e.g., window.location.href = response.hosted_url;
        },
        (error) => {
          console.error('Error creating Coinbase Commerce charge:', error);
        }
      );
  }
}
