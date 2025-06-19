import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer} from "microsoft-cognitiveservices-speech-sdk";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";
import {MatCardTitle} from "@angular/material/card";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-study-answers-speaking-medium-level',
  standalone: true,
  imports: [
    NgClass,
    MatGridList,
    MatGridTile,
    MatCardTitle,
    CdkDropListGroup,
    NgIf,
    MatButton,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './study-answers-speaking-medium-level.component.html',
  styleUrl: './study-answers-speaking-medium-level.component.scss'
})
export class StudyAnswersSpeakingMediumLevelComponent implements OnInit, OnDestroy {
  isMobile!: boolean;
  @Input() Reverse!: boolean;
  @Input() answers!: string[];
  @Input() question_value!: string | null;
  @Output() Result = new EventEmitter<boolean>();

  isSuccess!: boolean;
  isError!: boolean;

  protected recognizing = false;
  protected notification: string = '';
  protected innerHtml: string = '';
  private lastRecognized: string = '';
  private _recognizer!: SpeechRecognizer;
  speech: string = '';

  constructor(private responsiveService: ResponsiveService) {
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

  ngOnDestroy(): void {
    // this.responsiveService.isSuccessStudy$.unsubscribe();
    // this.responsiveService.isErrorStudy$.unsubscribe();
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
    this.speech = '';
  }

  Mic(event: MouseEvent): void {

    if (this.recognizing) {
      this.stop();
      this.recognizing = false;
    } else {
      this.speech = '';
      this.recognizing = true;
      const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

      const speechConfig = SpeechConfig.fromSubscription("E475UmsI2J4eL7fJrlH6Ey5EoeKw0VGS2Rayu2EhA1NIT94m13wqJQQJ99BFACBsN54XJ3w3AAAYACOGHp4S", "canadacentral");
      speechConfig.speechRecognitionLanguage = 'es-MX';
      speechConfig.enableDictation();
      this._recognizer = new SpeechRecognizer(speechConfig, audioConfig)
      this._recognizer.recognizing = this._recognizer.recognized = this.recognizerCallback.bind(this)
      this._recognizer.startContinuousRecognitionAsync();
    }
  }

  recognizerCallback(s: unknown, e: { result: { text: string; reason: number } }) {
    // console.log('recognizerCallback', e.result.text);
    const reason = ResultReason[e.result.reason];
    // console.log('reason', reason);
    if (reason == "RecognizedSpeech") {
      // this.stop();
      //console.log('finished', this.speech);
      // if (this.Reverse == true) {
      //   // console.log("this.Reverse", 'TRUE')
      //   // console.log("value", this.speech)
      // } else {
      //   const answer = this.question_value?.toLowerCase().substring(1, this.speech.length - 1);
      //   const val = this.speech.toLowerCase().substring(1, this.speech.length - 1);
      //   if (answer == val) {
      //     this.getResult(true);
      //   } else {
      //     this.getResult(false);
      //   }
      // }
    }
    this.speech = e.result.text;
  }

  getResult($event: boolean) {

    if ($event) {
      this.responsiveService.setResultSpeaking$(true);

      this.responsiveService.setIsSuccessStudy(true);
      this.responsiveService.setIsErrorStudy(false);
    } else {
      this.responsiveService.setResultSpeaking$(false);

      this.responsiveService.setIsErrorStudy(true);
      this.responsiveService.setIsSuccessStudy(false);
    }
  }

  private stopRecognizer = () => {
    this._recognizer.close();
    this._recognizer = null as unknown as SpeechRecognizer;
  }

  stop() {
    this._recognizer.stopContinuousRecognitionAsync(
      this.stopRecognizer,
      (err) => {
        this.stopRecognizer();
        console.error(err);
      }
    );
    if (this.Reverse == true) {
      // console.log("this.Reverse", 'TRUE')
      // console.log("value", this.speech)
    } else {
      const cleanedQuestion = this.question_value?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const cleanedSpeech = this.speech?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      if (cleanedQuestion == cleanedSpeech) {
        this.getResult(true);
      } else {
        this.getResult(false);
      }
      this.speech = '';
    }

  }
}
