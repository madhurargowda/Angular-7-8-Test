import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/users';
  private people: any[] = [];   //  local cache

  constructor(private http: HttpClient) {}

  // GET all people
  getPeople(): Observable<any> {
    if (this.people.length > 0) {
      return of(this.people);   // return cached data
    }
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => this.people = data)
    );
  }

  // GET person by id
  getPersonById(id: number): Observable<any> {
    const localPerson = this.people.find(p => p.id === id);
    if (localPerson) {
      return of({ ...localPerson });
    }
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // UPDATE person
  updatePerson(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => {
        const index = this.people.findIndex(p => p.id === id);
        if (index !== -1) {
          this.people[index] = { ...data };
        }
      })
    );
  }

  // DELETE person
  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.people = this.people.filter(p => p.id !== id);
      })
    );
  }
}
