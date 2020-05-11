import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(public authService: AuthService,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      displayName:['',Validators.required],
      userEmail:['',Validators.required],
      userPwd:['',Validators.required]
    })
  }

  onSubmit(){
    this.authService.SignUp(this.registrationForm.value)
    
  }
 

}
