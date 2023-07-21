import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDebitComponent } from './account-debit.component';

describe('AccountDebitComponent', () => {
  let component: AccountDebitComponent;
  let fixture: ComponentFixture<AccountDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDebitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
