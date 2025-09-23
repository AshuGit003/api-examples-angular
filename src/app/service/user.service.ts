import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]> {
    const url="http://localhost:3000/Users"
    return this.http.get<User[]>(url);
  }

  saveUsers(user:User):Observable<User> {
    const url="http://localhost:3000/Users"
    return this.http.post<User>(url,user);
  }

  deleteUser(id:string):Observable<User> {
    const url="http://localhost:3000/Users"
    return this.http.delete<User>(url + '/' + id);
  }

  getSelectedUser(id:string):Observable<User> {
    const url="http://localhost:3000/Users";
    return this.http.get<User>( url + '/' + id);
  }

  updateUser(user:User):Observable<User> {
    const url="http://localhost:3000/Users"
    return this.http.put<User>(url + '/' + user.id, user);
  }
}
