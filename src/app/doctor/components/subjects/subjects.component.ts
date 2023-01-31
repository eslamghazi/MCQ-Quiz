import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjects:any[] = []
user:any={}
  constructor(private service:DoctorService,
              private auth:AuthService,
              private toastr:ToastrService) { }
  ngOnInit(): void {
    this.getAllSubjects()
    this.getUserInfo()

  }

  getAllSubjects(){
    this.service.getAllSubjects().subscribe((res:any)=>{
  this.subjects = res
    })
  }

getUserInfo(){
  this.auth.getRole().subscribe((res)=>{
    this.user = res
  })
}
delete(index:any){
  let id = this.subjects[index].id
  this.subjects.splice(index,1)
  this.service.deleteSubject(id).subscribe((res)=>{
this.toastr.success("تم حذف الماده بنجاح")
  })
}
}
