import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

import { DataService } from '../data.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.css',
})
export class SearchPostComponent {
  posts$!: Observable<Post[]>;
  private searchTitle = new Subject<string>();

  constructor(private dataService: DataService) {}

  search(title: string): void {
    this.searchTitle.next(title);
  }

  ngOnInit(): void {
    this.posts$ = this.searchTitle.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((title: string) => this.dataService.searchData(title))
    );
  }
}
