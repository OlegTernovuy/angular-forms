import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service';
import { Post, sendedPost } from './post.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  data: Post[] = [];

  postedData: sendedPost | null = null;

  constructor(private dataService: DataService) {}

  postFormData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    userId: new FormControl(1),
  });

  ngOnInit(): void {
    this.dataService.getData().subscribe((result: Post[]) => {
      this.data = result;
    });
  }

  onSubmit() {
    this.dataService
      .postData(this.postFormData.value)
      .subscribe((result: sendedPost) => {
        this.postedData = result;
      });
    this.postFormData.reset();
  }
}
