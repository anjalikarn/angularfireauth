import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public authService: AuthService,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail:['',Validators.required],
      userPwd:['',Validators.required]
    })
  }

  onSubmit(){
    this.authService.SignIn(this.loginForm.value.userEmail,this.loginForm.value.userPwd)
    
  }

}
