import {
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {NgClass, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {CdTimerComponent, CdTimerModule, TimeInterface} from 'angular-cd-timer';
import {AccountService} from '../../../account/services';
import {CorrectAnswer} from '../../models/correct-answer';
import {Question} from '../../models/question';
import {StartTest} from '../../models/start-test';
import {StudyService} from '../../services/study.service';
import {NextQuestion} from '../../models/next-question';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {ResponsiveService} from "../../../core/services/responsive-service";
import {QuestionAndClockComponent} from "./components/question-and-clock/question-and-clock.component";
import {StudyAnswersComponent} from "./components/study-answers/study-answers.component";
import {Subject, Subscription} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  StudyAnswersReadingComponent
} from "./components/study-answers/components/study-answers-reading/study-answers-reading.component";


@Component({
  selector: 'app-run-study-next-question',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    CdTimerModule,
    TaskDetailsComponent,
    QuestionAndClockComponent,
    NgClass,
    StudyAnswersComponent,
    NgIf,
    MatProgressSpinner,
    StudyAnswersReadingComponent
  ],
  templateUrl: './run-study-next-question.component.html',
  styleUrl: './run-study-next-question.component.scss'
})
export class RunStudyNextQuestionComponent implements OnInit, OnDestroy {

  @Input() categoryId!: string;
  @Input() typeTestId!: string;
  @Input() reverse!: boolean;

  @ViewChild('section') section!: ElementRef<HTMLElement>;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  seconds: number | undefined;
  @ViewChild('basicTimer', {static: true}) basicTimer: CdTimerComponent | undefined;


  private lang: string | undefined = 'en';
  audioSource: string | undefined;
  test: StartTest | null = null;
  inputAnswers: CorrectAnswer[] = [];
  nextEnabled: boolean = false;
  question: string | null = null;
  questionId: string | null = null;
  todo: string[] = [];
  done: string[] = [];
  categoryName: string = "";
  testId: string = "";
  note: string = "";
  isLearned: boolean = false;
  isMobile: boolean = false;
  resultSpeaking: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  Speaking: boolean = false;
  isLoading = false;

  private subscriptionSpeaking: Subscription = new Subscription();
  private subscriptionSuccess: Subscription = new Subscription();
  private subscriptionError: Subscription = new Subscription();

  constructor(
    private responsiveService: ResponsiveService,
    private studyService: StudyService,
    // private testService: TestService,
    private accountService: AccountService,
    private router: Router) {
    if (this.typeTestId == '80907d2b-8387-4d4d-b7d6-1bc7d617d1bb' ||
      this.typeTestId == '1928f7d7-225f-4c32-b3f8-4786dc3dffee' ||
      this.typeTestId == '930c9e4a-60cc-462a-9b4a-0f2e6b263932'
    ) {
      this.responsiveService.isSuccessStudy$.subscribe(
        value => {
          this.isSuccess = value;
        }
      )
      this.responsiveService.isErrorStudy$.subscribe(
        value => {
          this.isError = value;
        }
      )
    }
    this.responsiveService.resultSpeaking$.subscribe(value => {
      this.resultSpeaking = value;
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionSpeaking) {
      this.subscriptionSpeaking.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptionSpeaking = this.responsiveService.Speaking$.subscribe(value => {
      this.Speaking = value;
    });

    this.isLearned = false;
    this.responsiveService.Completed$.subscribe(value => {
      if (value) {
        this.next(true);
      }
    });
    this.isMobile = this.responsiveService.isMobile;

    const str: string[] = [];
    this.isLoading = true;
    this.studyService.StartStudy(this.categoryId, this.typeTestId).subscribe(
      (startTest) => {
        this.isLoading = false;
        if (startTest.testId === "completed") {
          this.note = "Эта категория изучена, рекомендуем сдать тест/экзамен."
          this.isLearned = true;
          return;
        }

        this.startTest = startTest;
        this.audioSource = startTest.nextQuestionViewModel.questionViewModel.signedUrlS3;
        this.question = this.getTitle(startTest.nextQuestionViewModel.questionViewModel);
        this.questionId = startTest.nextQuestionViewModel.questionViewModel.questionId;
        this.test = startTest;
        this.inputAnswers = startTest.nextQuestionViewModel.listOfAnswers;
        const language = this.lang;
        this.inputAnswers.forEach(function (value) {
          switch (language) {
            case 'es':
              str.push(value.titleEs);
              break;
            case 'ru':
              str.push(value.titleRu);
              break;
            default:
              str.push(value.titleEn);
              break;
          }
        })
        this.done = [];
        this.todo = str;
        this.nextEnabled = true;
      }
    );

  }


  doActionBasicTimer(action: String) {
    switch (action) {
      case 'start':
        this.basicTimer?.start();
        break;
      case 'resume':
        this.basicTimer?.resume();
        break;
      case 'reset':
        this.basicTimer?.reset();
        break;
      default:
        this.basicTimer?.stop();
        break;
    }
  }

  getTitle(question: Question): string {
    switch (this.lang) {
      case 'es':
        return question.titleEs;
      case 'ru':
        return question.titleRu;
      default:
        return question.titleEn;
    }
  }

  startTest: StartTest | null = null;
  nextQuestion: NextQuestion | null = null;

  getCorrectAnswer(title: string, seconds: number | undefined): any {
    let result: CorrectAnswer | undefined = undefined;
    const questionId = this.questionId;
    const language = this.lang;
    this.inputAnswers.forEach(function (value) {
      let res = false;
      switch (language) {
        case 'es':
          res = title == value.titleEs;
          break;
        case 'ru':
          res = title == value.titleRu;
          break;
        default:
          res = title == value.titleEn;
          break;
      }
      if (res) {
        value.questionId = questionId!;
        value.seconds = seconds!;
        result = value;
      }
    })
    return result;
  }

  next2() {
    this.isSuccess = false;
    this.isError = false;
    return;
  }

  next(expiredTime: boolean = false) {

    if (this.isError == true) {
      this.isSuccess = false;
      this.isError = false;
      return;
    }

    this.isLoading = true;
    this.isLearned = false;
    this.nextEnabled = false;
    this.doActionBasicTimer('reset')
    const str: string[] = [];
    this.question = '';
    let сorrectAnswers: CorrectAnswer[] = [];
    let answer: CorrectAnswer | undefined = undefined;
    this.todo = [];
    this.done.forEach((value: string) => {
      const seconds = this.seconds;
      answer = this.getCorrectAnswer(value, seconds);
      if (answer != undefined) {
        сorrectAnswers.push(answer);
      }
    });

    let request = {
      testId: this.test?.testId,
      typeTestId: this.typeTestId,
      speakingResult: this.resultSpeaking,
      categoryId: this.categoryId ?? 'WorkOnMistakes',
      countQuestions: this.test?.countQuestion,
      numberQuestion: 0,
      finished: false,
      nextQuestionViewModel: {
        questionViewModel: {
          questionId: this.questionId,
          categoryId: this.test?.categoryId ?? 'WorkOnMistakes',
          // keyS3: '',
          // expiredSignedUrlS3: '',
          signedUrlS3: this.audioSource,
          title: this.question,
          proofUrl: '',
          proofCRC: '',
        },
        listOfAnswers: сorrectAnswers,
        inputOfAnswers: this.inputAnswers,
        expiredTime: expiredTime
      },
    }

    if (this.startTest?.testId === "completed") {
      this.note = "Эта категория изучена, рекомендуем сдать тест/экзамен."
      this.isLearned = true;
      return;
    }

    this.studyService.CheckAnswerStudy(request).subscribe(
      value => {
        this.inputAnswers = [];
        this.resultSpeaking = false;
        this.isLoading = false;
        if (value) {
          if (!(this.typeTestId == '80907d2b-8387-4d4d-b7d6-1bc7d617d1bb' ||
            this.typeTestId == '1928f7d7-225f-4c32-b3f8-4786dc3dffee' ||
            this.typeTestId == '930c9e4a-60cc-462a-9b4a-0f2e6b263932'
          )) {

            this.isSuccess = true;
            this.isError = false;
          }

          this.startTest = null;
          this.isLoading = true;
          this.studyService.GetNextQuestionsForStudy(request).subscribe(
            value => {
              this.isLoading = false;
              this.nextQuestion = value;
              if (this.nextQuestion?.questionViewModel?.questionId === "completed") {
                this.isLearned = true;
                this.note = "Эта категория изучена, рекомендуем сдать тест/экзамен."
                return;
              }

              this.questionId = value.questionViewModel.questionId;
              if (this.questionId == "" || this.questionId == null) {
                this.nextEnabled = false;
                this.router.navigate(['/'])
              } else {
                this.audioSource = value.questionViewModel.signedUrlS3;
                this.question = this.getTitle(value.questionViewModel);
                this.inputAnswers = value.listOfAnswers;
                const language = this.lang;
                value.listOfAnswers.forEach(function (value) {
                  switch (language) {
                    case 'es':
                      str.push(value.titleEs);
                      break;
                    case 'ru':
                      str.push(value.titleRu);
                      break;
                    default:
                      str.push(value.titleEn);
                      break;
                  }
                })
                this.todo = str;
                this.done = [];
                this.nextEnabled = true;
                this.doActionBasicTimer('start')
              }

            }
          );

        } else {
          if (!(this.typeTestId == '80907d2b-8387-4d4d-b7d6-1bc7d617d1bb' ||
            this.typeTestId == '1928f7d7-225f-4c32-b3f8-4786dc3dffee' ||
            this.typeTestId == '930c9e4a-60cc-462a-9b4a-0f2e6b263932'
          )) {
            this.isSuccess = false;
            this.isError = true;
          }
          if (this.startTest != null) {
            this.audioSource = this.startTest!.nextQuestionViewModel.questionViewModel.signedUrlS3;
            this.question = this.getTitle(this.startTest!.nextQuestionViewModel.questionViewModel);
            this.questionId = this.startTest!.nextQuestionViewModel.questionViewModel.questionId;
            this.test = this.startTest!;
            this.inputAnswers = this.startTest!.nextQuestionViewModel.listOfAnswers;
            const language = this.lang;
            this.inputAnswers.forEach(function (value) {
              switch (language) {
                case 'es':
                  str.push(value.titleEs);
                  break;
                case 'ru':
                  str.push(value.titleRu);
                  break;
                default:
                  str.push(value.titleEn);
                  break;
              }
            })
            this.done = [];
            this.todo = str;
            this.nextEnabled = true;
          } else {

            this.questionId = this.nextQuestion!.questionViewModel.questionId;
            if (this.questionId == "" || this.questionId == null) {
              this.nextEnabled = false;
              this.router.navigate(['/'])
            } else {
              this.audioSource = this.nextQuestion!.questionViewModel.signedUrlS3;
              this.question = this.getTitle(this.nextQuestion!.questionViewModel);
              this.inputAnswers = this.nextQuestion!.listOfAnswers;
              const language = this.lang;
              this.nextQuestion!.listOfAnswers.forEach(function (value) {
                switch (language) {
                  case 'es':
                    str.push(value.titleEs);
                    break;
                  case 'ru':
                    str.push(value.titleRu);
                    break;
                  default:
                    str.push(value.titleEn);
                    break;
                }
              })
              this.todo = str;
              this.done = [];
              this.nextEnabled = true;
              this.doActionBasicTimer('start')
            }
          }
        }
      })
  }

  skip() {
    this.isLoading = true;
    this.isLearned = false;
    this.nextEnabled = false;
    this.doActionBasicTimer('reset')
    const str: string[] = [];
    this.question = '';
    let сorrectAnswers: CorrectAnswer[] = [];
    let answer: CorrectAnswer | undefined = undefined;
    this.todo = [];
    this.done.forEach((value: string) => {
      const seconds = this.seconds;
      answer = this.getCorrectAnswer(value, seconds);
      if (answer != undefined) {
        сorrectAnswers.push(answer);
      }
    });

    let request = {
      testId: this.test?.testId,
      typeTestId: this.typeTestId,
      speakingResult: this.resultSpeaking,
      categoryId: this.categoryId ?? 'WorkOnMistakes',
      countQuestions: this.test?.countQuestion,
      numberQuestion: 0,
      finished: false,
      nextQuestionViewModel: {
        questionViewModel: {
          questionId: this.questionId,
          categoryId: this.test?.categoryId ?? 'WorkOnMistakes',
          // keyS3: '',
          // expiredSignedUrlS3: '',
          signedUrlS3: this.audioSource,
          title: this.question,
          proofUrl: '',
          proofCRC: '',
        },
        listOfAnswers: сorrectAnswers,
        inputOfAnswers: this.inputAnswers,
        expiredTime: false
      },
    }

    if (this.startTest?.testId === "completed") {
      this.note = "Эта категория изучена, рекомендуем сдать тест/экзамен."
      this.isLearned = true;
      return;
    }

    this.studyService.GetNextQuestionsForStudy(request).subscribe(
      value => {
        this.isLoading = false;
        this.nextQuestion = value;
        if (this.nextQuestion?.questionViewModel?.questionId === "completed") {
          this.isLearned = true;
          this.note = "Эта категория изучена, рекомендуем сдать тест/экзамен."
          return;
        }

        this.questionId = value.questionViewModel.questionId;
        if (this.questionId == "" || this.questionId == null) {
          this.nextEnabled = false;
          this.router.navigate(['/'])
        } else {
          this.audioSource = value.questionViewModel.signedUrlS3;
          this.question = this.getTitle(value.questionViewModel);
          this.inputAnswers = value.listOfAnswers;
          const language = this.lang;
          value.listOfAnswers.forEach(function (value) {
            switch (language) {
              case 'es':
                str.push(value.titleEs);
                break;
              case 'ru':
                str.push(value.titleRu);
                break;
              default:
                str.push(value.titleEn);
                break;
            }
          })
          this.todo = str;
          this.done = [];
          this.nextEnabled = true;
          this.doActionBasicTimer('start')
        }

      }
    );
  }

  getResult($event: boolean) {
    this.resultSpeaking = $event;
  }
}


