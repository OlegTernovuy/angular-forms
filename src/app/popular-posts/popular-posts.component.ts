import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Post } from '../posts/post.model';
import { DataService } from '../data.service';
import { SearchPostComponent } from "../search-post/search-post.component";

@Component({
  selector: 'app-popular-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchPostComponent],
  templateUrl: './popular-posts.component.html',
  styleUrl: './popular-posts.component.css'
})
export class PopularPostsComponent {
  posts: Post[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.dataService.getData()
      .subscribe(posts => this.posts = posts.slice(1, 5));
  }
}
