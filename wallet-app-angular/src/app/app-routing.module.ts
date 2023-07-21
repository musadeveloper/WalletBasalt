
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountHomeComponent } from './account-home/account-home.component'; 

import { AccountBalanceComponent } from './account-balance/account-balance.component'; 
import { AccountCreditComponent } from './account-credit/account-credit.component'; 
import { AccountDebitComponent } from './account-debit/account-debit.component'; 
import { AccountTransactionComponent } from './account-transaction/account-transaction.component'; 
 

const routes: Routes = [
  { path: 'login', component: AccountLoginComponent },
  { path: 'account-creation', component: AccountCreationComponent },
  { path: 'account-home', 
    component: AccountHomeComponent,
    children: [
      { path: '', redirectTo: 'account-balance', pathMatch: 'full' },
      { path: 'account-balance', component: AccountBalanceComponent }, 
      { path: 'account-credit', component:  AccountCreditComponent },
      { path: 'account-debit', component: AccountDebitComponent }, 
      { path: 'account-transaction', component: AccountTransactionComponent },
    ] },
 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}