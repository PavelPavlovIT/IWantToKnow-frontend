import {Component, ElementRef, Inject, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {StartTest} from "../../models/start-test";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  CdkDragDrop,
  CdkDropListGroup,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {CorrectAnswer} from "../../models/correct-answer";
import {TestService} from "../../services/test.service";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {DOCUMENT, NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Question} from "../../models/question";
import {CdTimerComponent, CdTimerModule, TimeInterface} from "angular-cd-timer";
import {StudyService} from "../../services/study.service";
import {AccountService} from "../../../account/services";
import {MatCard, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ResponsiveService} from "../../../core/services/responsive-service";
import {CoreModule} from "../../../core/core.module";
import {
  HeaderHierarchyOfCategoriesComponent
} from "../../../core/components/header-hierarchy-of-categories/header-hierarchy-of-categories.component";
import {
  MatExpansionModule,
} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Subscription} from "rxjs";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {QuestionAndClockComponent} from "./components/question-and-clock/question-and-clock.component";
import {StudyAnswersComponent} from "../run-study-next-question/components/study-answers/study-answers.component";
import {TestAnswersComponent} from "./components/test-answers/test-answers.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-run-test-next-question',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    CdkDropListGroup,
    CdkDropList, CdkDrag, CdTimerModule, NgClass, MatCardSubtitle, NgSwitch, NgSwitchCase, CoreModule,
    HeaderHierarchyOfCategoriesComponent,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TaskDetailsComponent, QuestionAndClockComponent, QuestionAndClockComponent, StudyAnswersComponent, TestAnswersComponent, NgIf, MatProgressSpinner
  ],
  templateUrl: './run-test-next-question.component.html',
  styleUrl: './run-test-next-question.component.scss'
})
export class RunTestNextQuestionComponent implements OnInit, OnDestroy {
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  @ViewChild('basicTimer', {static: true}) basicTimer: CdTimerComponent | undefined;

  @Input() categoryId!: string;
  @Input() typeTestId!: string;
  isMobile: boolean = false;

  @Input() parentId!: string;
  @Input() categoryName!: string;
  @Input() testId!: string;

  seconds: number | undefined;
  lang: string | undefined = 'en';
  test: StartTest | null = null;
  inputAnswers: CorrectAnswer[] = [];
  nextEnabled: boolean = false;
  todo: string[] = [];
  done: string[] = [];
  audioSource: string | undefined;
  question: string | null = null;
  questionId: string | null = null;
  TextSpeaking: string = '';
  Speaking: boolean = false;
  isLoading: boolean = true

  private subscription: Subscription = new Subscription();
  private subscriptionSpeaking: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private responsiveService: ResponsiveService,
    private studyService: StudyService,
    private testService: TestService,
    private accountService: AccountService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionSpeaking) {
      this.subscriptionSpeaking.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptionSpeaking = this.responsiveService.Speaking$.subscribe(value => {
      this.Speaking = value;
    });

    this.subscription = this.responsiveService.Completed$.subscribe(value => {
      if (value) {
        this.next(true);
      }
    });

    this.isMobile = this.responsiveService.isMobile;

    const str: string[] = [];

    this.testService.StartTest(this.categoryId, this.categoryName, this.typeTestId, 0).subscribe(
      (startTest) => {
        // this.responsiveService.Reset$.next(true);
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
        this.isLoading = false;
      }
    );

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

  public getTitleCorrectAnswer(correctAnswer: CorrectAnswer): string {
    switch (this.lang) {
      case 'es':
        return correctAnswer.titleEs;
      case 'ru':
        return correctAnswer.titleRu;
      default:
        return correctAnswer.titleEn;
    }
  }

  getCorrectAnswer(title: string, seconds: number | undefined): any {
    let result: CorrectAnswer | undefined = undefined;
    const questionId = this.questionId;
    const language = this.lang;
    this.inputAnswers.forEach(function (value) {
      let indexOf = -1;
      switch (language) {
        case 'es':
          indexOf = title.indexOf(value.titleEs);
          break;
        case 'ru':
          indexOf = title.indexOf(value.titleRu);
          break;
        default:
          indexOf = title.indexOf(value.titleEn);
          break;
      }
      if (indexOf != -1) {
        value.questionId = questionId!;
        value.seconds = seconds!;
        result = value;
      }
    })
    return result;
  }

  getResultSpeaking(speech: string) {
    this.TextSpeaking = speech;
  }

  next(expiredTime: boolean = false) {
    this.isLoading = true;
    this.responsiveService.PressingNextButtonOn();
    if (!expiredTime)
      this.responsiveService.Reset$.next(true);
    this.nextEnabled = false;

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
      typeTestId: this.test?.typeTestId,
      speakingResult: this.TextSpeaking == '' ? false : true,
      TextSpeaking: this.TextSpeaking,
      typeStudy: "exam",
      categoryId: this.test?.categoryId ?? 'WorkOnMistakes',
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
        expiredTime: expiredTime
      },
    }


    this.testService.NextQuestion(request).subscribe(
      value => {
        this.isLoading = false;
        this.questionId = value.questionViewModel.questionId;

        if (this.questionId == "" || this.questionId == null) {
          this.nextEnabled = false;
          this.router.navigate(['products/analytics'])
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
        }
        this.isLoading = false;
      }
    );

    this.inputAnswers = [];
  }

}
