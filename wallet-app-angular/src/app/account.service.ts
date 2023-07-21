import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionModel } from './models/account.model';
import { TransactionHistoryModel } from './models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7267/api/Account'; 

  constructor(private http: HttpClient) { }

  getTransactionHistory(accountId: number): Observable<TransactionHistoryModel> {
    const url = `${this.apiUrl}/${accountId}/TransactionHistory`;
    return this.http.get<TransactionHistoryModel>(url);
  }

  getAccountBalance(accountId: number): Observable<number> {
    const url = `${this.apiUrl}/${accountId}/Balance`;
    return this.http.get<number>(url);
  }

  creditAccount(accountId: number, creditModel: TransactionModel): Observable<TransactionModel> {
    const url = `${this.apiUrl}/${accountId}/Credit`;
    return this.http.post<TransactionModel>(url, creditModel);
  }

  debitAccount(accountId: number, debitModel: TransactionModel): Observable<TransactionModel> {
    const url = `${this.apiUrl}/${accountId}/Debit`;
    return this.http.post<TransactionModel>(url, debitModel);
  }

  
}
