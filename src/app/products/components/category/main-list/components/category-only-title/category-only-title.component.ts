import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category-only-title',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    NgClass,
    MatCardSubtitle
  ],
  templateUrl: './category-only-title.component.html',
  styleUrl: './category-only-title.component.scss'
})
export class CategoryOnlyTitleComponent {
  IsMobile: boolean = false;
  @Input() CategoryId!: string;
  @Input() Title!: string;
  @Input() Description!: string;
}
