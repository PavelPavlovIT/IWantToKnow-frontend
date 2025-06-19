import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResponsiveService} from "../../../../../../core/services/responsive-service";
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {MatButton} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AudioConfig, ResultReason, SpeechConfig, SpeechRecognizer} from "microsoft-cognitiveservices-speech-sdk";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-test-answers-speaking',
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
  templateUrl: './test-answers-speaking.component.html',
  styleUrl: './test-answers-speaking.component.scss'
})
export class TestAnswersSpeakingComponent implements OnInit {
  @Input() isMobile!: boolean;
  @Input() Reverse!: boolean;
  @Input() answers!: string[];
  @Input() question_value!: string | null;
  @Output() ResultSpeaking = new EventEmitter<string>();

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
    this.responsiveService.PressingNextButton$.subscribe(
      value => {
        if (value)
          this.speech = '';
      }
    )
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
      this.responsiveService.SpeakingOn();
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

  getResult(speech: string) {
    this.ResultSpeaking.emit(speech)
  }

  private stopRecognizer = () => {
    this._recognizer.close();
    this._recognizer = null as unknown as SpeechRecognizer;
  }

  stop() {
    this.responsiveService.PressingNextButtonOff();
    this._recognizer.stopContinuousRecognitionAsync(
      this.stopRecognizer,
      (err) => {
        this.stopRecognizer();
        console.error(err);
      }
    );
    this.responsiveService.SpeakingOff()
    if (this.Reverse == true) {
    } else {
      this.getResult(this.speech);
    }

  }
}
