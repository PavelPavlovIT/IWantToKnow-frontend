import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ResponsiveService} from "../../../../../../core/services/responsive-service";

@Component({
  selector: 'app-task-details-listening',
  standalone: true,
  imports: [
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    NgIf,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-details-listening.component.html',
  styleUrl: './task-details-listening.component.scss'
})
export class TaskDetailsListeningComponent implements OnInit {
  @Input() type_task_id: string | null = null;
  @Input() type_task_title: string | null = null;
  @Input() type_task_value: string | null = null;
  @Input() task_value: string | null = null;
  @Input() question_title: string | null = null;
  @Input() question_value: string | null = null;

  @Input() audioSource: string | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  isMobile!: boolean;
  constructor(private responsiveService: ResponsiveService) {
  }

  ngOnInit(): void {
    this.isMobile = this.responsiveService.isMobile;
  }

  Play() {
    this.audio.nativeElement.src = this.audioSource!;
    this.audio.nativeElement.play();
  }

}
