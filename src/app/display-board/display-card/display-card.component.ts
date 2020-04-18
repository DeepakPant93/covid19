import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent implements OnInit {

  @Input() count: number;
  @Input() message: string;
  @Input() color: string;
  @Input() name: string;
  @Input() chipCount: number;
  @Input() date: string;
  @Input() margin: number;
  marginString: string;

  constructor() { }

  ngOnInit(): void {
    this.marginString = this.margin + 'em';
    this.date = new Date(this.date).toDateString();
  }
}
