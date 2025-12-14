import { Component } from '@angular/core';
import { UserAddComponent } from '../../components/user-add-component/user-add-component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserAddComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class UsersComponent { }  // <-- nom corrigé
