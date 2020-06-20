import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DATA } from './data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  getSearchResults(query:String){
    return of(DATA.RESULTS);
  }
}
