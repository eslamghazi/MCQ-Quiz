import { AuthService } from './../../../auth/services/auth.service';
import { DoctorService } from './../../../doctor/services/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
userSubjects:any[] = []
studentInfo:any
id:any
Subject:any
user:any
total:number = 0
showResult:boolean = false
validExam:boolean = true
  constructor(private route:ActivatedRoute,
              private service:DoctorService,
              private toastr:ToastrService,
              private auth:AuthService) {

this.id = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.getSubject()
    this.getLogedInUser()
  }
getSubject(){
this.service.getSubjects(this.id).subscribe((res:any)=>{
this.Subject = res
})
}

delete(index:number){
  this.Subject.questions.splice(index,1)
  const model = {
    name:this.Subject.name,
    questions:this.Subject.questions
  }
  this.service.updateSubject(this.id,model).subscribe((res)=>{
this.toastr.success("تم حذف الماده بنجاح")
  })
}

getLogedInUser(){
  this.auth.getRole().subscribe((res)=>{
    this.user = res
    this.getUserDate()
  })
}


getUserDate(){
  this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
this.studentInfo = res
this.userSubjects = res?.subjects ? res?.subjects : []
this.checkValidExam()
  })
}

checkValidExam(){
  for(let x in this.userSubjects){
    if(this.userSubjects[x].id == this.id){
      this.total = this.userSubjects[x].degree
      this.validExam = false
      this.toastr.warning('لقد انجزت هذا الاختبار مسبقًا')
    }
  }
}

getAnswer(event:any){
  let value = event.value,
  questionIndex = event.source.name
  this.Subject.questions[questionIndex].studentAnswer = value
console.log(this.Subject.questions);
}



getResult(){
  this.total = 0
for (let x in this.Subject.questions){
  if(this.Subject.questions[x].studentAnswer == this.Subject.questions[x].correctAnswer){
    this.total++
  }
}
this.userSubjects.push({
  name:this.Subject.name,
  id:this.id,
  degree:this.total,
  finalDegree:this.Subject.questions.length
})
const model = {
  username: this.studentInfo.username,
  email: this.studentInfo.email,
  password: this.studentInfo.password,
  subjects:this.userSubjects
}
this.auth.updateStudent(this.user.userId,model).subscribe((res)=>{
  this.toastr.success('تم تسجيل النتيجة بنجاح')
})

this.showResult = true
console.log(this.total);
}
}
