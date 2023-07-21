export interface AccountCreationModel {
    accountNumber: string;
    accountHolderName: string;
    initialBalance: number;
    password: string;
  }
  
  export interface AccountLoginModel {
    accountNumber: string;
    password: string;
  }

  export interface TransactionModel {
    AccountId: number;
    Amount: number;
    Type: string;
    TransactionDate: Date;
  }
  
  export interface TransactionHistoryModel {
    accountId: number;
    transactions: TransactionModel[];
  }

