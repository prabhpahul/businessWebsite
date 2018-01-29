import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Category } from '../shared/models/category.model';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCat(cat: Category): Observable<Category> {
    return this.http.post<Category>('/api/categoryAdd', cat);
  }

  
  

}