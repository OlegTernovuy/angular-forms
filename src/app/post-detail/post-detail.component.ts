import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

import { Post } from '../posts/post.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.dataService.getPost(id).subscribe((post) => (this.post = post));
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.post) {
      this.dataService
        .updatePost(this.post.id, this.post)
        .pipe(
          catchError((err) => {
            console.error('Error post data', err);
            return of(null);
          })
        )
        .subscribe(() => {
          alert('Success!');
          this.goBack();
        });
    }
  }
}
