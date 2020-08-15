import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { OrderingComponent } from './components/ordering/ordering.component'; //Need this to use ngModel

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    AddTaskComponent,
    SearchBarComponent,
    OrderingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
