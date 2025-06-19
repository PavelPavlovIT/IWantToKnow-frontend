import {Component, Input} from '@angular/core';
import {ClockComponent} from "../../../../../core/components/clock/clock.component";
import {MatCardSubtitle} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-question-and-clock-reading',
  standalone: true,
  imports: [
    ClockComponent,
    MatCardSubtitle,
    NgClass,
    NgIf
  ],
  templateUrl: './question-and-clock-reading.component.html',
  styleUrl: './question-and-clock-reading.component.scss'
})
export class QuestionAndClockReadingComponent {
  @Input() isMobile!: boolean;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;
}
