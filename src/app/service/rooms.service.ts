import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    private apiURL = 'http://127.0.0.1:8000/test/rooms';

    constructor(private readonly http: HttpClient) {}

    getRooms(page: number = 1, limit: number = 4) {
        return this.http.get(this.apiURL.concat(`?page=${page}&limit=${limit}`));
    }

    getRoom(room_id: string) {
        return this.http.get(this.apiURL.concat(`/show?id=${room_id}`));
    }
}
