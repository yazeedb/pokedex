import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-meter',
  template: '<span></span>',
  styleUrls: ['./stat-meter.component.scss']
})
export class StatMeterComponent implements OnInit {
  constructor(private el: ElementRef) {}

  @Input()
  stat: number;

  ngOnInit() {
    const maxWidth = this.el.nativeElement.clientWidth;
    const meter: HTMLElement = this.el.nativeElement.querySelector('span');

    meter.style.width = `${(this.stat * maxWidth) / 255}px`;
  }
}
