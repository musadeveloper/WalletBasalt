import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent {
  isSidebarOpen = true;

 
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigating to:', event.url);
      }
    });
  }

  navigateToBalance() {
    this.router.navigate(['/account-home/account-balance']);
  }

  navigateToCredit() {
    this.router.navigate(['/account-home/account-credit']);
  }

  navigateToDebit() {
    this.router.navigate(['/account-home/account-debit']);
  }

  navigateToTransactions() {
    this.router.navigate(['/account-home/account-transaction']);
  }

  logout() {
    localStorage.removeItem('accountId');
    this.router.navigate(['/login']);
    

  }

}
