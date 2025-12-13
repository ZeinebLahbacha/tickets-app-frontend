import { Component } from '@angular/core';
import { UserAddComponent } from '../../components/user-add-component/user-add-component';

@Component({
  selector: 'app-users',
  imports: [UserAddComponent],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

}
