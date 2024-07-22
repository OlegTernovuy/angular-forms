import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PopularPostsComponent } from './popular-posts/popular-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/popularPosts', pathMatch: 'full' },
  { path: 'popularPosts', component: PopularPostsComponent },
  { path: 'detail/:id', component: PostDetailComponent },
  { path: 'userForm', title: 'User Form Page', component: UserFormComponent },
  { path: 'userPosts', title: 'Posts Page', component: PostsComponent },
  { path: '**', title: 'NotFound Page', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
