import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getData(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  postData(post: any): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/posts/${id}`);
  }

  searchData(title: string): Observable<Post[]> {
    if (!title.trim()) {
      return of([]);
    }
    return this.http.get<Post[]>(`${this.apiUrl}/posts?title=${title}`);
  }
}
