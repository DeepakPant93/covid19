import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-chip',
  templateUrl: './display-chip.component.html',
  styleUrls: ['./display-chip.component.css']
})
export class DisplayChipComponent implements OnInit {

  @Input() chipCount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
