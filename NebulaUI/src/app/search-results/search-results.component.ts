import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SearchValue } from '../search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() results : SearchValue[]
  @Input() metadata
  p:number = 1
  constructor() { }

  ngOnInit(): void {
    this.metadata = {
      'count':undefined
    }
  }
  ngOnChanges(changes:SimpleChanges){
    if(changes){
      this.results = (changes['results'])?changes['results'].currentValue:'';
      this.metadata = (changes['metadata'])?changes['metadata'].currentValue:'';
    }
  }
}
