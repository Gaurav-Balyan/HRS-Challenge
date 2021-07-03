import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    public apiUrl: string = 'http://localhost:4000';

    constructor(
        private http: HttpClient
    ) {}

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getUserById(id: number) {
        return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/users/register`, user);
    }

    edit(id: number, user: User) {
        return this.http.put(`${this.apiUrl}/users/${id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}
