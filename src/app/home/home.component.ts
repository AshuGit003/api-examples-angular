import { Component } from '@angular/core';
import { User } from '../interface/User';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: User[] = []
  selectedUser: User | undefined
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    })
  }

  addUser(user: User) {
    if (!this.selectedUser) {
      this.userService.saveUsers(user).subscribe((res: User) => {
        if (res) {
          this.getUsers();
        }
      })
    } else {
      const userData: User = { id:this.selectedUser.id , name: user.name, age: user.age, email: user.email}; 
      this.userService.updateUser(userData).subscribe((res: User) => {
        if (res) {
          this.getUsers();
        }
      });
    }

  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res: User) => {
      if (res) {
        this.getUsers();
      }
    });
  }

  selectUser(id: string) {
    this.userService.getSelectedUser(id).subscribe((res: User) => {
      this.selectedUser = res;
    });
  }
}
