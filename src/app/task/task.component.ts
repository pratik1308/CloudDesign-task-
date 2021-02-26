import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { Todo } from '../Model/todo';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  todos: Todo[] = [];
  working: Todo[] = [];
  completed: Todo[] = [];
  name = '';
  content = '';
  show = false;
  displayValue = 'none';

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      (todos) => {
        this.todos = this.noteService.filter(todos, 'todo');
        this.working = this.noteService.filter(todos, 'working');
        this.completed = this.noteService.filter(todos, 'completed');
      }
      );
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        const todo = event.item.data;
                        todo.state = event.container.element.nativeElement.classList[0];
                        this.noteService.updateNote(todo).subscribe(
                          (response) => {
                            console.log(response);
                          }
                        );
    }
  }
  display() {
    this.show = ! this.show;
    this.displayValue = 'block';
  }
  hide() {
    this.displayValue = 'none';
    this.show = ! this.show;
    this.name = '';
    this.content = '';
    
  }
  addTodo() {
    const todo = new Todo(this.name , this.content, 'todo');
    this.noteService.addTodo(todo).subscribe(
      (reponse) => {
        this.ngOnInit();
        this.hide();
      }
    );
  }
}
