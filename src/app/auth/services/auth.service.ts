import { Subject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  user = new Subject()
  createUser(model:any){
  return  this.http.post(environment.baseApi + 'students' , model)
  }
  login(model:any){
  return  this.http.put(environment.baseApi + 'login/1' , model)
  }
  getAllUsers(type:string){
  return  this.http.get(environment.baseApi + type )
  }
  getStudent(id:any){
  return  this.http.get(environment.baseApi + 'students/' + id )
  }
  updateStudent(id:any,model:any){
  return  this.http.put(environment.baseApi + 'students/' + id ,model )
  }
  getRole(){
  return  this.http.get(environment.baseApi + 'login/1' )
  }
}
