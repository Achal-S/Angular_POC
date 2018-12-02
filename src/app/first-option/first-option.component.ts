import { EmployeeService } from './../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';





@Component({
  selector: 'app-first-option',
  templateUrl: './first-option.component.html',
  styleUrls: ['./first-option.component.css']
})
export class FirstOptionComponent implements OnInit {
  employees: Employee[];
  constructor(private empService:EmployeeService) { }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      employee_name: {
        title: 'Employee Name'
      },
      employee_salary: {
        title: 'Salary'
      },
      employee_age: {
        title: 'Age'
      }
    }
  };

  ngOnInit() {

    this.empService
      .getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;

    });
  }

}
