import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { SearchValue } from './search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NebulaUI';
  arr: SearchValue[] = []
  constructor(private searchService : SearchService){}
  mclick(val){
    console.log(val.search);
    this.searchService.getSearchResults(val.search).subscribe((data:SearchValue[])=>{
      this.arr = data;
    });
  }
}