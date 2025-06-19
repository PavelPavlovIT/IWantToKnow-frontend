import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import {
  Subject,
  BehaviorSubject,
  fromEvent,
} from 'rxjs';
import {
  takeUntil,
  debounceTime,
} from 'rxjs/operators';


@Injectable()
export class ResponsiveService implements OnDestroy {
  private _unsubscriber$: Subject<any> = new Subject();
  public PressingNextButton$ = new BehaviorSubject<boolean>(false);
  public Speaking$ = new BehaviorSubject<boolean>(false);
  public isErrorStudy$ = new BehaviorSubject<boolean>(false);
  public isSuccessStudy$ = new BehaviorSubject<boolean>(false);
  public resultSpeaking$ = new BehaviorSubject<boolean>(false);

  public Completed$ = new BehaviorSubject<boolean>(false);
  public Reset$ = new BehaviorSubject<boolean>(false);
  public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(0);
  public mediaBreakpoint$: BehaviorSubject<string> = new BehaviorSubject("");
  public isMobile: boolean = false;

  constructor() {
    this.init();
  }
//нажатие кнопки некст и очищениие спича!!
  public PressingNextButtonOn(){
    this.PressingNextButton$.next(true);
  }
  public PressingNextButtonOff(){
    this.PressingNextButton$.next(false);
  }
  public SpeakingOn(){
    this.Speaking$.next(true)
  }
  public SpeakingOff(){
    this.Speaking$.next(false)
  }
  public resetResultsStudy() {
    this.isErrorStudy$.next(false);
    this.isSuccessStudy$.next(false);
  }

  public setResultSpeaking$(value: boolean) {
    this.resultSpeaking$.next(value);
  }


  public setIsErrorStudy(value: boolean) {
    this.isErrorStudy$.next(value);
  }

  public setIsSuccessStudy(value: boolean) {
    this.isSuccessStudy$.next(value);
  }


  init() {
    this._setScreenWidth(window.innerWidth);
    this._setMediaBreakpoint(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscriber$)
      ).subscribe((evt: any) => {
      this._setScreenWidth(evt.target.innerWidth);
      this._setMediaBreakpoint(evt.target.innerWidth);
    });
  }

  ngOnDestroy() {
    this._unsubscriber$.next(null);
    this._unsubscriber$.complete();
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
  }

  private _setMediaBreakpoint(width: number): void {
    if (width < 576) {
      this.mediaBreakpoint$.next('xs');
    } else if (width >= 576 && width < 768) {
      this.mediaBreakpoint$.next('sm');
    } else if (width >= 768 && width < 992) {
      this.mediaBreakpoint$.next('md');
    } else if (width >= 992 && width < 1200) {
      this.mediaBreakpoint$.next('lg');
    } else if (width >= 1200 && width < 1600) {
      this.mediaBreakpoint$.next('xl');
    } else {
      this.mediaBreakpoint$.next('xxl');
    }
  }

}
