import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ClockComponent} from "../../../../../../core/components/clock/clock.component";
import {MatCardSubtitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ResponsiveService} from "../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-question-and-clock-listening',
  standalone: true,
  imports: [
    ClockComponent,
    MatCardSubtitle,
    NgClass,
    NgIf,
    MatButton,
    MatIcon
  ],

  templateUrl: './question-and-clock-listening.component.html',
  styleUrl: './question-and-clock-listening.component.scss'
})
export class QuestionAndClockListeningComponent implements OnInit {
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
