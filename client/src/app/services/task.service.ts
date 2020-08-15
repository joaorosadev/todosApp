import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entry } from './../models/Entry';
import { Observable } from 'rxjs';

//We send information to the server in json format so we need to specify that on the request's headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksUrl: string = 'http://localhost:8000/tasks'; //Server base endpoint for tasks api
  
  constructor(private http: HttpClient) { }

  /**
   * Request all tasks
   * GET '/tasks'
   */
  getTasks():Observable<Entry[]>{
    return this.http.get<Entry[]>(this.tasksUrl);
  }

  /**
   * Request a task update
   * PUT '/tasks/{id}'
   * @param task Task to update
   */
  changeDonePropertyOnServer(task: Entry): Observable<any>{
    const url = this.tasksUrl + "/" + task.id;
    return this.http.put(url,task,httpOptions);
  }

  /**
   * Request a task deletion
   * DELETE '/tasks/{id}'
   * @param task Task to delete
   */
  deleteTask(task: Entry): Observable<Entry> {
    const url = this.tasksUrl + "/" + task.id;
    return this.http.delete<Entry>(url,httpOptions);
  }

  /**
   * Request a task addition
   * POST '/tasks'
   * @param task  Task to add
   */
  addTask(task: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.tasksUrl, task, httpOptions);
  }
}
