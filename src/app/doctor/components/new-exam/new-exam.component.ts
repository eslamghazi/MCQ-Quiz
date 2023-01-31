import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  name = new FormControl("")
  QuestionForm!:FormGroup
  correctNum:any
  id:any
  questions:any[]=[]
  startAdd:boolean =false
  subjectName:any
  stepperIndex = 0
  preview :boolean =false
  newSubjectName:any
  constructor(private fb:FormBuilder ,
              private toastr:ToastrService,
              private service:DoctorService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.QuestionForm = this.fb.group({
      question:['',[Validators.required]],
      answer1:['',[Validators.required]],
      answer2:['',[Validators.required]],
      answer3:['',[Validators.required]],
      answer4:['',[Validators.required]],

    })

  }
  createQuestion(){
    if(this.correctNum && this.correctNum.length !== 0){


      const model={
        question : this.QuestionForm.value.question,
        answer1 : this.QuestionForm.value.answer1,
        answer2 : this.QuestionForm.value.answer2,
        answer3 : this.QuestionForm.value.answer3,
        answer4 : this.QuestionForm.value.answer4,
        correctAnswer:this.QuestionForm.value[this.correctNum]

      }
      this.questions.push(model)
      this.QuestionForm.reset()

    }else{
    this.toastr.warning("الرجاء اختيار الصواب")
    }
    console.log(this.questions);


  }

  getCorrect(event:any){
  this.correctNum = event.value
      }

      start(){
if(this.name.value == ''){
  this.toastr.warning('يرجى إدخال اسم الماده')
}else{
  this.startAdd = true
  this.subjectName = this.name.value

}
if(this.startAdd){
  this.stepperIndex = 1
}
      }

clearForm(){
  this.QuestionForm.reset()
}
cancel(){
  this.QuestionForm.reset()
  this.questions=[]
  this.subjectName=''
  this.name.reset()
  this.stepperIndex= 0
  this.startAdd = false
}

submit(){
  const model = {
    name:this.subjectName,
    questions:this.questions,
  }

if(this.preview){
  this.stepperIndex = 2
}else{
  this.service.createSubject(model).subscribe((res:any) =>{
  this.toastr.success('تم وضع الاختبار بنجاح')
    this.preview = true
    this.id = res.id
  })

}

}

delete(index:any){
  this.questions.splice(index,1)
  const model = {
    name:this.subjectName,
    questions:this.questions,
  }
  this.service.updateSubject(this.id,model).subscribe((res)=>{
    this.toastr.success('تم حذف السؤال بنجاح')
  })

}
}
