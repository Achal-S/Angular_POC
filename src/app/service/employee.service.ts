import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://dummy.restapiexample.com/api/v1/employees';

  constructor(private http: HttpClient) { }


  getEmployees() {
    return this
           .http
           .get(`${this.uri}`);
  }
}
