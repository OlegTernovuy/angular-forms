import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getData(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?_limit=10`);
  }

  postData(post: any): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}`, post);
  }
}
