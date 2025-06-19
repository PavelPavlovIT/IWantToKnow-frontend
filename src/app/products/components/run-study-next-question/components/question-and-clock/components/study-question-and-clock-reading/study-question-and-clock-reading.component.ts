import {Component, Input, OnInit} from '@angular/core';
import {MatCardSubtitle} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {ResponsiveService} from "../../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-study-question-and-clock-reading',
  standalone: true,
  imports: [
    MatCardSubtitle,
    NgClass
  ],
  templateUrl: './study-question-and-clock-reading.component.html',
  styleUrl: './study-question-and-clock-reading.component.scss'
})
export class StudyQuestionAndClockReadingComponent  implements OnInit{
  @Input() isTimer!: boolean;
  isMobile!: boolean;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;

  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

}
