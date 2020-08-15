import { Component, OnInit } from '@angular/core';
import {Entry} from '../../models/Entry';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  todosList: Entry[]; //UI list of tasks

  constructor(private taskService:TaskService) { }

  /**
   * Getting the server's tasks when the component initializes.
   */
  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks =>{
      this.todosList = tasks;
    });
    
  }

  /**
   * Catching the deleteTask event emitted by the task component (child).
   * By deleting from the UI first, the web page feels more responsive if the server is busy.
   * @param task Task to delete
   */
  deleteTask(task: Entry){
    //Deleting from UI
    this.todosList = this.todosList.filter(t => t.id !== task.id);

     //Deleting from server
     this.taskService.deleteTask(task).subscribe();
  }

  /**
   * Catching addTask event from child component add-task.
   * We wait for the server to add it locally before adding it to the UI.
   * Could be added first to the UI for more responsiveness, but this is used to contrast with the deleteTask method approach.
   * @param task Task to add
   */ 
  addTask(task: Entry){
    this.taskService.addTask(task).subscribe(t => {
      this.todosList.push(t);
    });
  }

  /**
   * Catching filterTasks event from child component search-bar.
   * Need to filter from the list on the server, because if we filter on the todosList, when deleting characters 
   * from the search-bar, the previously filtered out elements won't display again.
   * @param description Filter parameter
   */
  filterTasks(description: string){
    this.taskService.getTasks().subscribe(tasks => {
      this.todosList = tasks.filter((t) => {
        return t.description.toLowerCase().search(description.toLowerCase()) != -1;
      });
    });
  }

  /**
   * Receive ordered list from child component when it emits an event
   * @param list ordered
   */
  receiveOrderedList(list: Entry[]){
    this.todosList = list;
  }
}
