import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './Model/todo';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  link = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }


  getNotes(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.link);
  }
  updateNote(todo: Todo) {
    return this.http.put(this.link, todo);
  }
  filter(tab, property) {
    return tab.filter(
      (todo) => {
        return todo.state === property;
      }
    );
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.link, todo);
  }
}
