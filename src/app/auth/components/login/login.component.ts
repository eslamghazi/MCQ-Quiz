import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users:any[]=[]
  loginForm!:FormGroup
  type:string = 'students'
  constructor(private fb:FormBuilder,
              private service:AuthService,
              private toastr:ToastrService,
              private router:Router) { }
  ngOnInit(): void {
    this.createForm()
    this.getAllUsers()
  }

  createForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      type:[this.type],
    })
  }

  getRole(selectedRole:any){
 this.type = selectedRole.value
 this.getAllUsers()
  }

  getAllUsers(){
    this.service.getAllUsers(this.type).subscribe((res:any)=>{
      this.users=res
      console.log(this.users);
    })
  }

submit(){

    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
    console.log(this.users);

console.log(index);

if(index == -1){
  this.toastr.error('الأيميل أو كلمة المرور خطأ')

}else{
  const model = {
    username:this.users[index].username,
    type:this.type,
    userId:this.users[index].id
    }

  this.service.login(model).subscribe((res)=>{
    this.service.user.next(res)
    this.toastr.success("تم تسجيل الدخول بنجاح")
    this.router.navigate(['/subjects'])

  })
}
}
}
