import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    OnInit,
    AfterViewInit,
    OnDestroy,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import {ChangeDetectionStrategy, NgZone} from '@angular/core';
import {Observable, timer, Subscription, BehaviorSubject} from 'rxjs';
import {timeInterval, tap, map} from 'rxjs/operators';

import {formatDate} from '@angular/common';
import {DatePipe} from '@angular/common';
import {ResponsiveService} from "../../services/responsive-service";

@Component({
    selector: 'cs-canvas-clock',
    template: '<canvas #mycanvas></canvas>',
    standalone: true,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('mycanvas', {static: false, read: ElementRef}) canvasRef: ElementRef | undefined;
    public tdate = new Date();
    @Input() isMobile: boolean = false;
    @Input() width: number = 100;
    @Input() height: number = 100;
    @Input() isTimer: boolean = true;
    resetTick: boolean = false;
    canvasContext: CanvasRenderingContext2D | null = null;
    subscription: Subscription | undefined;

    constructor(
        private responsiveService: ResponsiveService,
        private ngZone: NgZone,) {
        this.responsiveService.Reset$.subscribe(value => {
            this.resetTick = value;
        })
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvasRef!.nativeElement;
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        const radius = canvasEl.height / 2;
        const innerRadius = radius * 0.89;
        this.canvasContext = canvasEl.getContext('2d');
        if (!this.canvasContext) {
            throw new Error('Failed to get 2D context');
        }
        this.canvasContext.translate(radius, radius);
        this.ngZone.runOutsideAngular(() => this.draw(innerRadius));
    }

    ngOnChanges(change: SimpleChanges) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (change['tdate']) {
            this.tdate = change['tdate'].currentValue;
            if (this.canvasRef) {
                const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
                canvasEl.width = this.width;
                canvasEl.height = this.height;
                const radius = canvasEl.height / 2;
                const innerRadius = radius * 0.89;
                this.canvasContext = canvasEl.getContext('2d');
                if (!this.canvasContext) {
                    throw new Error('Failed to get 2D context');
                }
                this.canvasContext.translate(radius, radius);
                this.ngZone.runOutsideAngular(() => this.draw(innerRadius));
            }
        }
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    draw(innerRadius: number) {
        this.drawBackground(this.canvasContext, innerRadius);
    }

    drawBackground(canvasContext: CanvasRenderingContext2D | null, innerRadius: number) {
        var background = new Image();
        let date = new Date(0);

        if (this.isTimer) {
            let date = new Date(0);
        } else {
            let date = new Date(this.tdate);
        }
        let dp = new DatePipe('en-US');
        let am_pm = dp.transform(date, "a");
        if (am_pm == 'AM' && background.src != "clockAM.webp") {
            background.src = "clockAM.webp";
        } else if (am_pm == 'PM' && background.src != "clockPM.webp") {
            background.src = "clockPM.webp";
        }
        let $this = this;
        background.onload = function () {
            $this.subscription = timer(0, 1000)
                .pipe(
                    tap(t => {
                        if (canvasContext) {
                            canvasContext.clearRect($this.width / 2 * -1, $this.height / 2 * -1, $this.height, $this.width);
                            date = new Date(date.setSeconds(date.getSeconds() + 1));
                            if ($this.isTimer) {
                                if (date.getSeconds() == 59) {
                                    $this.responsiveService.Completed$.next(true);
                                    date = new Date(0);
                                }
                                if ($this.resetTick == true) {
                                    $this.resetTick = false;
                                    date = new Date(0);
                                }
                            }

                            // canvasContext.drawImage(background, -50, -50, 100, 100);
                            if (!$this.isMobile)
                                canvasContext.drawImage(background, -50, -50, 100, 100);
                            else
                                canvasContext.drawImage(background, -25, -25, 50, 50);
                            $this.drawTime(canvasContext, innerRadius, date);
                        }
                    })
                )
                .subscribe(s => {
                    }
                );
        }
    }

    drawFace(ctx: CanvasRenderingContext2D, radius: number) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0.5, '#333');
        grad.addColorStop(0, '#1ABB9C');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.050;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0.1, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }

    drawNumbers(ctx: CanvasRenderingContext2D, radius: number) {
        let ang;
        let num;
        let dot = '.';
        ctx.font = radius * 0.1 + 'px arial';
        ctx.font = "10pt Courier";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.85);
            ctx.rotate(-ang);
            ctx.fillText(dot, 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.85);
            ctx.rotate(-ang);
        }
    }

    drawTime(ctx: CanvasRenderingContext2D, radius: number, date: Date) {
        const seconds = date.getSeconds();
        // const seconds = this.sec;
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const hourHand =
            (hours % 12) * Math.PI / 6 + minutes * Math.PI / (6 * 60) + seconds * Math.PI / (360 * 60);
        //this.drawHand(ctx, hourHand, radius * 0.5, radius * 0.07);
        if (!this.isTimer)
            this.drawHourHand(ctx, date, radius * 0.6, radius * 0.05);
        const minuteHand = minutes * Math.PI / 30 + seconds * Math.PI / (30 * 60);
        if (!this.isTimer)
            this.drawMinuteHand(ctx, date, radius * 0.8, radius * 0.04);
        //this.drawHand(ctx, minuteHand, radius * 0.8, radius * 0.07);
        const secondHand = seconds * Math.PI / 30;
        this.drawSecondHand(ctx, date, radius * 0.9, radius * 0.03);
        //this.drawHand(ctx, secondHand, radius * 0.9, radius * 0.02);
    }

    degreesToRadians(degrees: number): number {
        return (Math.PI / 180) * degrees
    }

    drawHourHand(ctx: CanvasRenderingContext2D, theDate: Date, length: number, width: number) {
        var hours = theDate.getHours() + theDate.getMinutes() / 60;

        var degrees = (hours * 360 / 12) % 360;

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = '#555';

        ctx.rotate(this.degreesToRadians(degrees));

        this.drawHand(ctx, length, width, 3);

        ctx.restore();

    }

    drawMinuteHand(ctx: CanvasRenderingContext2D, theDate: Date, length: number, width: number) {
        var minutes = theDate.getMinutes() + theDate.getSeconds() / 60;

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.strokeStyle = '#555';
        ctx.rotate(this.degreesToRadians(minutes * 6));

        this.drawHand(ctx, length, width, 5);

        ctx.restore();
    }

    drawHand(ctx: CanvasRenderingContext2D, size: number, thickness: number, shadowOffset: number) {
        thickness = thickness || 4;

        // ctx.shadowColor = '#555';
        // ctx.shadowBlur = 10;
        // ctx.shadowOffsetX = shadowOffset;
        // ctx.shadowOffsetY = shadowOffset;

        ctx.beginPath();
        ctx.moveTo(0, 0); // center
        ctx.lineTo(thickness * -1, -10);
        ctx.lineTo(0, size * -1);
        ctx.lineTo(thickness, -10);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.stroke();
    }

    drawSecondHand(ctx: CanvasRenderingContext2D, theDate: Date, length: number, width: number) {
        var seconds = theDate.getSeconds();
        // var seconds = this.sec;
        ctx.save();
        ctx.fillStyle = '#1ABB9C';
        ctx.strokeStyle = "#1ABB9C";
        ctx.globalAlpha = 0.8;
        ctx.rotate(this.degreesToRadians(seconds * 6));

        this.drawHand(ctx, length, width, 0);

        ctx.restore();
    }

}
