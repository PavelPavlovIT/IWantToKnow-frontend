import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-question-and-clock-listening',
  standalone: true,
  imports: [
    NgClass,
    MatButton,
    MatIcon
  ],
  templateUrl: './study-question-and-clock-listening.component.html',
  styleUrl: './study-question-and-clock-listening.component.scss'
})
export class StudyQuestionAndClockListeningComponent implements OnInit{
  @Input() isTimer!: boolean;

  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;

  @Input() audioSource: string | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;
  isMobile!: boolean;

  Play() {
    this.audio.nativeElement.src = this.audioSource!;
    this.audio.nativeElement.play();
  }

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

}
