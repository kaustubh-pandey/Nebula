import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SearchValue } from '../search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() results : SearchValue[]
  resultSize : Number
  p:number = 1
  constructor() { }

  ngOnInit(): void {
    
  }
  ngOnChanges(changes:SimpleChanges){
    for(let change in changes){
      this.results = changes[change].currentValue;
      this.resultSize = changes[change].currentValue.length;
    }
  }
}
