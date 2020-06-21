import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  getSearchResults(query:String){
    let postObj = {
      "query":query
    };
    let httpHeaders = new HttpHeaders();
    let historyOptions = {'headers':httpHeaders,'withCredentials':false}
    return this.http.post('/api/search',postObj,historyOptions);
  }
}
