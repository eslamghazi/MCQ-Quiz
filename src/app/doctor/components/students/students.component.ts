import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataTable:any
  dataSource:any
  displayedColumns:any
  constructor(private service:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree', 'finalDegree'];

   }


  ngOnInit(): void {
    this.getStudents()
  }

getStudents(){
  this.service.getAllUsers('students').subscribe((res:any)=>{
    console.log(res);

this.dataSource = res?.map((student:any)=>{
  if(student?.subjects){
    return student?.subjects?.map((subject:any)=>{
      return {
        name:student.username,
        subjectName:subject.name,
        degree:subject.degree,
        finalDegree:subject.finalDegree
      }
    })
  }else{
    return [{
      name:student.username,
      subjectName:"_",
      degree:"_",
      finalDegree:"_",
    }]
  }
})


this.dataTable = []
this.dataSource.forEach((item:any)=>{
  item.forEach((subItem:any)=>{
this.dataTable.push({
  name:subItem.name,
  subjectName:subItem.subjectName,
  degree:subItem.degree,
  finalDegree:subItem.finalDegree

})
  })
})
console.log(this.dataSource);
console.log(this.dataTable);


  })

}
}
