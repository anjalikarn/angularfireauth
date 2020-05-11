//import { auth } from 'firebase';
import { User } from './user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { auth} from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  ProfileData: any; // Save logged in user data
  //user$: Observable<User>;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone 
  ) {
     

   

   
       /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        // show email in welcome message
        this.userData = user.uid;        
      }else{
        this.userData = null;
      }
    });
 
  }


  SignIn(email,pwd){
    return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then( () => {
        return this.afAuth.signInWithEmailAndPassword(email, pwd)
        .then((result)=>{
          //this.userData = result.user.uid;
          this.router.navigate(['dashboard']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Sign up with email/password
  SignUp(formValue) {
    return this.afAuth.createUserWithEmailAndPassword(formValue.userEmail, formValue.userPwd)
      .then((result) => {
        //console.log(result);
        this.userData = result.user.uid;
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        //this.sendEmailVerification();
     

        //this.SetUserData(result.user,name);
        //this.router.navigate(['dashboard']);
        
        this.afs.doc(`users/${result.user.uid}`).set({
          displayName : formValue.displayName,
          email : formValue.userEmail,
          uid: result.user.uid,
          emailVerified: result.user.emailVerified,
          photoURL: result.user.photoURL,
          phone:result.user.phoneNumber
        })
        //localStorage.setItem('user', result.user.uid);
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
        this.afs.doc(`users/${result.user.uid}`).set({
          displayName : result.user.displayName,
          email : result.user.email,
          uid: result.user.uid,
          emailVerified: result.user.emailVerified,
          photoURL: result.user.photoURL,
          phone:result.user.phoneNumber
        })
          this.router.navigate(['dashboard']);
        })
      //this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          this.router.navigate(['verify-email-address']);
          console.log('email sent');
        })
      });
  }

  

  // Send email verfificaiton when new user sign up
  /*async SendVerificationMail() {
    await this.afAuth.currentUser.sendEmailVerification()
    this.router.navigate(['verify-email-address']);
  }
  */


   // Returns true when user is looged in and email is verified
   /*get isLoggedIn(): boolean {
     console.log(this.afAuth.authState);
    const user = this.afAuth.authState;
    return (user !== null) ? true : false;
  }*/

  get isLoggedIn(): boolean {
    if (this.userData == null ) {
        return false;
       
      } else {
        return true;
        
      }
    }

  

  getUserData(userKey){
    return this.afs.collection('users').doc(userKey).snapshotChanges();
   
}





// Sign in with Google
/*GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider());
}

// Auth logic to run auth providers
AuthLogin(provider) {
  return this.afAuth.signInWithPopup(provider)
  .then((result) => {
     this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      })
    //this.SetUserData(result.user);
  }).catch((error) => {
    window.alert(error)
  })
}*/

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  /*SetUserData(user,name) {
    console.log(user)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      position: "Developer",
      displayName: name,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }*/
  
  
  
  

  

   // Sign out
   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['sign-in']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })

  }
  
  
  

}

