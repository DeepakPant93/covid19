import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() count: number;
  @Input() message: string;
  @Input() color: string;
  @Input() name: string;

  constructor() {
  }

  ngOnInit() {
  }

}
