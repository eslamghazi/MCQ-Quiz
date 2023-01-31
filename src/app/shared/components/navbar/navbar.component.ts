import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user:any = null
  constructor(private service:AuthService) {

this.service.user.subscribe((res:any)=>{
  if(res.type){
  this.user = res
}
})
   }
  ngOnInit(): void {

  }

  signOut(){
    const model = {}
    this.service.login(model).subscribe(res=>{
      this.user = null
      this.service.user.next(res)
    })

  }

}
