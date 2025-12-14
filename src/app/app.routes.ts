import { Routes } from '@angular/router';
import { Tickets } from './pages/tickets/tickets';
import { UsersComponent } from './pages/users/users'; 
import { DashboardComponent } from './components/dashboard/dashboard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: Tickets },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'users', component: UsersComponent }, 
  { path: '**', redirectTo: '/tickets' } 
];
