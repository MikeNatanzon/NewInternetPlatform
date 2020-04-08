import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

	uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getIssues(){
  	return this.http.get('${this.uri}/issues');
  }

  getIssueById(id){
  	return this.http.get('${this.uri}/issues/${id}');
  }

  addIssue(FirstName,LastName,Username,EmailAddress,Password)
  {
  	const issue = {
  		FirstName: FirstName,
  		LastName: LastName,
  		Username: Username,
  		EmailAddress: EmailAddress,
  		Password: Password
  	};
  	return this.http.post('${this.uri}/issues/add',issue);
  }

  updateIssue(id,FirstName,LastName,Username,EmailAddress,Password,status)
  {
  	const issue = {
  		FirstName: FirstName,
  		LastName: LastName,
  		Username: Username,
  		EmailAddress: EmailAddress,
  		Password: Password,
  		status: status
  	};
  	return this.http.post('${this.uri}/issues/update/${id}',issue);
  }

  deleteIssue(id)
  {
  	return this.http.get('${this.uri}/issues/delete/${id}');
  }
}