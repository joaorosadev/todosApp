import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  //Variable to allow emitting task creation events, so that the list component (parent) can catch it and add it to the UI
  @Output() addTask: EventEmitter<any> = new EventEmitter(); 

  description: string =""; //Description of a new task

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add task submit handler
   */
  onSubmit(){
    if(this.hasBadInput()) return;
    
    const task = {
      id: -1, //Since we don't use the ID on the UI we give it a default value of -1, the server puts a correct ID on its data
      description: this.description,
      done: false
    };

    this.addTask.emit(task);
    this.description = "";
  }

  /**
   * Client-side validation
   * error-div is an hidden div in the list component, if the input is incorrect, we show it for 5 seconds to alert the user
   */
  hasBadInput(){
    if(this.description.length == 0 || this.description.length > 40){
      $("#error-div").fadeIn(700);
      setTimeout(()=>{
        $("#error-div").fadeOut(700);
      }, 5000);
      return true;
    }
    return false;
  }

}
