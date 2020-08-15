import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Entry } from 'src/app/models/Entry';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  //Takes data from parent component (list)
  @Input() task: Entry;
  //Variable to allow emitting deleteTask events, so that the list component (parent) can catch it update the UI
  @Output() deleteTask: EventEmitter<Entry> = new EventEmitter();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  /**
   * If a given task is done, add is-done class to the description's paragraph which puts a line through the text
   */
  lineThroughIfDone(){
    return {'is-done': this.task.done};
  }

  /**
   * When checkbox is pressed, changes the task completion state and updates the server with the info
   * @param task 
   */
  onPress(task: Entry){
    //Change UI
    task.done = !task.done;

    //Change in server
    this.taskService.changeDonePropertyOnServer(task).subscribe(task => console.log(task));
  }

  /**
   * Emits deleteTask event which is caught by the list component (parent)
   * @param task 
   */
  onDelete(task: Entry){
    this.deleteTask.emit(task);
  }
}
