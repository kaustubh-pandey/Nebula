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
  metadata
  constructor(private searchService : SearchService){}
  mclick(val){
    this.searchService.getSearchResults(val.search).subscribe((data)=>{
      console.log(data);
      this.arr = data['results'];
      this.metadata = data['metadata'];
    });
  }
}