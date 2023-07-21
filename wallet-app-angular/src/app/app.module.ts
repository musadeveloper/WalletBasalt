import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountHomeComponent } from './account-home/account-home.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { AccountCreditComponent } from './account-credit/account-credit.component';
import { AccountDebitComponent } from './account-debit/account-debit.component';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { AccountTransactionComponent } from './account-transaction/account-transaction.component';


@NgModule({
  declarations: [AppComponent, AccountLoginComponent, AccountCreationComponent, AccountHomeComponent, AccountBalanceComponent,
    AccountCreditComponent,
    AccountDebitComponent,
    AccountTransactionComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}