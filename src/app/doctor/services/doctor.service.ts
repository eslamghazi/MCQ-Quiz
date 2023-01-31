import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubject(model:any){
    return this.http.post(environment.baseApi + 'subjects' , model)
  }
  updateSubject(id:any,model:any){
    return this.http.put(environment.baseApi + 'subjects/' +id ,model)
  }
  getAllSubjects(){
    return this.http.get(environment.baseApi + 'subjects' )
  }
  getSubjects(id:any){
    return this.http.get(environment.baseApi + 'subjects/' + id )
  }
  deleteSubject(id:any){
    return this.http.delete(environment.baseApi + 'subjects/' + id )
  }

}
