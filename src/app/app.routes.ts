import { Routes } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', title: 'Login Page', component: UserFormComponent },
  // { path: '**', title: 'NotFound Page', component: NotFoundComponent },
];
