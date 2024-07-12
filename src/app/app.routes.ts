import { Routes } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
  { path: 'userForm', title: 'User Form Page', component: UserFormComponent },
  { path: 'userPosts', title: 'Posts Page', component: PostsComponent },
  // { path: '**', title: 'NotFound Page', component: NotFoundComponent },
];
