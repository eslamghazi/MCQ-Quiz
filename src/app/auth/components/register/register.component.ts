import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  students:any[]=[]
  userForm!:FormGroup
  constructor(private fb:FormBuilder,
              private service:AuthService,
              private toastr:ToastrService,
              private router:Router) { }
  ngOnInit(): void {
    this.createForm()
    this.getAllUsers()
  }

  createForm(){
    this.userForm = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    })
  }
  getAllUsers(){
    this.service.getAllUsers('students').subscribe((res:any)=>{
      this.students=res
      console.log(this.students);
    })
  }
submit(){
  const model = {
    username:this.userForm.value.username,
    email:this.userForm.value.email,
    password:this.userForm.value.password  }

    let index = this.students.findIndex(item => item.email == this.userForm.value.email)
    console.log(this.students);

console.log(index);

if(index !== -1){
  this.toastr.error('الإيميل مسجل بالفعل')

}else{
  this.service.createUser(model).subscribe((res:any)=>{
    this.toastr.success("تم التسجيل بنجاح")

    const model = {
      username:res.username,
      type:'students',
      userId:res.id
      }

    this.service.login(model).subscribe((res)=>{
      this.service.user.next(res)

    })

    this.router.navigate(['/subjects'])
  })




}
}
}
