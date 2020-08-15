import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Entry} from '../../models/Entry';

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css']
})
export class OrderingComponent implements OnInit {
  @Input() todos: Entry[];
  @Output() orderedList: EventEmitter<Entry[]> = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  
  }

  /**
   * Order tasks descend
   */
  orderDesc(){
    this.todos.sort((a,b)=>{
      let ad = a.description.toLowerCase();
      let bd = b.description.toLowerCase();
      
      if(ad > bd) return 1;
      if(ad < bd) return -1;
      return 0;
    });
    this.orderedList.emit(this.todos);
  }

  /**
   * Order tasks ascend
   */
  orderAsc(){
    this.todos.sort((a,b)=>{
      let ad = a.description.toLowerCase();
      let bd = b.description.toLowerCase();
      
      if(ad > bd) return -1;
      if(ad < bd) return 1;
      return 0;
    });
    this.orderedList.emit(this.todos);
  }

}
