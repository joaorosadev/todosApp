import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  //Variable to allow emitting filter tasks events, so that the list component (parent) can catch it and filter the UI
  @Output() filterTasks: EventEmitter<string> = new EventEmitter();
  
  description: string =""; //Filter

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits filterTasks event on keyup event
   */
  keyUp(){
    this.filterTasks.emit(this.description);
  }
}
