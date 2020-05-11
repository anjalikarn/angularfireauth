import { User } from './../shared/user';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items :any;
  uid:string;
  userData:User;

  constructor(public authService: AuthService,private afAuth : AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.getData( this.uid);
      }else{
        this.uid = null; 
      }
    });
  }

  getData(uid){
    
      this.authService.getUserData(uid)
      .subscribe(result =>{
        this.items = result.payload.data();
      });
    
  }

}
