import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import { MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule, DOCUMENT, NgFor, NgIf} from "@angular/common";
import {AccountService} from "../../services";
import {PaymentService} from "../../services";
import {PaymentViewModel} from "../../models/payment";
import {MatDivider} from '@angular/material/divider';
import {Language} from '../../models/language';
import {UserInfo} from "../../models";
import {ResponsiveService} from "../../../core/services/responsive-service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { CdkAccordionModule} from "@angular/cdk/accordion";


@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    NgIf,
    NgFor,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    ClipboardModule,
    MatButtonModule,
    MatIcon,
    MatDivider,
    MatIconModule,
    CdkAccordionModule
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  error: boolean = false;
  ErrorMessage: string = "";
  success: boolean = false;
  SuccessMessage: string = "";

  showingAddForm: boolean = false;
  showingListTransactions: boolean = false;
  payments: PaymentViewModel[] = [];
  features = ['En', 'Es', 'Ru'];
  expireDateTime: string = "";
  expired: boolean = false;

  languages: Language[] = [
    {value: 'en', viewValue: 'En'},
    {value: 'es', viewValue: 'Es'},
    {value: 'ru', viewValue: 'Ru'},
  ];
  selectedValue = this.languages[0].value;
  txid: string = "";
  amount: number = 0;
  showAddForm: string = "Ваши донаты";
  showListTransactionsForm: string = "Список транзакций";
  userInfo: UserInfo | null = null;
  isMobile: boolean = false;
  openingTRX: boolean = false;
  openingBSC: boolean = false;
  openingARBITRUM: boolean = false;
  openingETH: boolean = false;


  /**
   *
   */
  constructor(
    private responsiveService: ResponsiveService,
    private paymentService: PaymentService,
    @Inject(DOCUMENT) private document: Document,
    private accountService: AccountService) {
    this.paymentService.GetPaymentsByUserId().subscribe(
      (value) => {
        this.payments = value;
      }
    )
    this.accountService.isSignedIn().forEach((userInfo) => {
      const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
      this.expireDateTime = userInfo == null ? "" : new Date(userInfo.expireDateTime + 'Z').toLocaleString();
      this.expired = userInfo == null ? false : userInfo.expired;
      this.selectedValue = userInfo == null ? "en" : userInfo.language;
      this.userInfo = userInfo;
    });
  }

  ngOnInit() {
    this.isMobile = this.responsiveService.isMobile;
  }

  openSnackBarQuestion1() {
    this._snackBar.open(
      'Статус Premium предоставляет Вам возможность получать результаты тестов оперативно, ' +
      'не дожидаясь первых дней месяца, когда Вам отправят письмо с Вашими результатами по почте.' +
      'Статус Premium предоставляет вам больше возможностей, чем обычным пользователям. Ваш статус важен для проекта!', 'Закрыть');
  }

  openSnackBarQuestion2() {
    this._snackBar.open(
      'Донат от 30 USDT дает статус Premium на 1 день за каждый USDT. ' +
      'Донат меньше 30 USDT дает статус Premium на 1 день за каждые 10 USDT. ', 'Закрыть');
  }

  openSnackBarQuestion3() {
    this._snackBar.open(
      'Сделайте три репоста в день о проекте и получите статус Premium на один день. ' +
      'Отправьте письмо на support@iwanttoknow.net с темой "хочу делать репост".', 'Закрыть');
  }

  openSnackBarTrx() {
    navigator.clipboard.writeText('TXs2G1uLWxX8SkN6GpijUBgWxM8viahphw').then().catch(e => console.log(e));
    this._snackBar.open('Скопирован адресс TRX ', 'Закрыть');
  }

  openSnackBarBSC() {
    navigator.clipboard.writeText('0x20701912f5dba30a0d957779b288a89a9725609b').then().catch(e => console.log(e));
    this._snackBar.open('Скопирован адресс Bep20', 'Закрыть');
  }

  openSnackBarARBITRUM() {
    navigator.clipboard.writeText('0x20701912f5dba30a0d957779b288a89a9725609b').then().catch(e => console.log(e));
    this._snackBar.open('Скопирован адресс ARBITRUM', 'Закрыть');
  }

  openSnackBarETH() {
    navigator.clipboard.writeText('0x20701912f5dba30a0d957779b288a89a9725609b').then().catch(e => console.log(e));
    this._snackBar.open('Скопирован адресс ETH', 'Закрыть');
  }

  strToLocalDate(inputDate:string):string{
    return ((inputDate == null)||(inputDate=="")) ? "" : new Date(inputDate).toLocaleDateString() + " " + new Date(inputDate).toLocaleTimeString();
  }
  Send() {
    this.error = false;
    this.paymentService.GetTransactionById(this.txid).subscribe(
      (value) => {
        if (!value.isSuccess) {
          this.success = false;
          this.ErrorMessage = value.message;
          if (value.amount == -1) {
            this.error = true;
            this.showAddForm = "Ваши донаты"
            this.txid = "";
            this.amount = 0;
          } else {
            this.error = true;
            this.showAddForm = "Ваши донаты"
            this.txid = "";
            this.amount = 0;
          }
          return;
        }
        this.accountService.isSignedIn().forEach((userInfo) => {
          const valid = !!(userInfo && userInfo.email && userInfo.email.length > 0);
          this.expireDateTime = userInfo == null ? "" : new Date(userInfo.expireDateTime).toLocaleDateString() + " " + new Date(userInfo.expireDateTime).toLocaleTimeString();
          this.expired = userInfo == null ? false : userInfo.expired;
          this.selectedValue = userInfo == null ? "en" : userInfo.language;
        });

        this.paymentService.GetPaymentsByUserId().subscribe(
          value => {
            this.payments = value;
            this.txid = "";
          }
        )

        if (value.isSuccess) {
          this.error = false;
          this.success = true;
          this.SuccessMessage = "Транзакция найдена и успешна внесена в список Ваших транзакций";
          this.txid = "";
          this.amount = 0;
          this.showingAddForm = false;
          this.showingAddForm = !this.showingAddForm;
          if (this.showingAddForm) {
            this.showAddForm = "Скрыть"
          } else {
            this.showAddForm = "Ваши донаты"
          }
        }
      }
    )
  }

  ShowAddForm() {
    this.ErrorMessage = "";
    this.SuccessMessage = "";
    this.error = false;
    this.success = false;
    this.showingAddForm = !this.showingAddForm;

    if (this.showingAddForm) {
      this.showAddForm = "Скрыть";
    } else {
      this.showAddForm = "Ваши донаты"
    }
  }

  ShowListTransactions() {
    this.ErrorMessage = "";
    this.SuccessMessage = "";
    this.error = false;
    this.success = false;

    this.showingListTransactions = !this.showingListTransactions;
    if (this.showingListTransactions) {
      this.showListTransactionsForm = "Скрыть список";
    } else {
      this.showListTransactionsForm = "Список транзакций"
    }
  }

}
