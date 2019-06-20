import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);    
        this.checkifmoodisdone(result.user);
      })
  }
  checkifmoodisdone(userdata){
    let DateObj = new Date();
    let date = ('0' + DateObj.getDate()).slice(-2) + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + DateObj.getFullYear() 
    let MoodREF = this.afs.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(date);
    MoodREF.get()
    .subscribe(snap =>{
      if (snap.exists)
    {            this.router.navigate(['dashboard'])
    console.log('DailyFeedback exists already. Redirecting to dashboard');
  }
  else{
    this.ngZone.run(() => {
      this.router.navigate(['mood-screen']);
    });
  }
    })

    
    }
  // Sign up with email/password
  SignUp(email, password, doctor, fname, lname) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.CreateUser(result.user,email,doctor,fname,lname);
      }).catch((error) => {
        window.alert(error.message)

      });
      
      
  }
  CreateUser(user, email, doctor, fname, lname){
    let doctorRef = this.afs.doc('Physiotherapists/'+ doctor).ref;
    return this.afs.collection('Patients').doc(user.uid).set({
      FirstName: fname,
      LastName: lname,
      Email: email,
      PhysiotherapistID:doctorRef

    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  getDoctors(){
    return this.afs.collection('Physiotherapists').snapshotChanges();
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}