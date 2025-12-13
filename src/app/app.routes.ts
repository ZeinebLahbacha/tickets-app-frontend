import { Routes } from '@angular/router';
import { Tickets } from './pages/tickets/tickets';
import { Users } from './pages/users/users';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: Tickets },
  { path: 'users', component: Users },
  { path: '**', redirectTo: '/tickets' } 
];
