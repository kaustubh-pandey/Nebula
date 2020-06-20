import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() heading:String
  @Input() content:String
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes:SimpleChanges){
    this.heading = (changes['heading'])?changes['heading'].currentValue:'';
    this.content = (changes['content'])?changes['content'].currentValue:'';
  }
}
