import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    public db: AngularFirestore,    
    public router: Router,  ) {}
    insertMoodScale(moodnum){
      let userdata = JSON.parse(localStorage.getItem('user'))
      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').add({
        Mood: parseInt(moodnum),
      })
      .then(docRef => {
      localStorage.setItem('DailyFeedbackID' , (docRef) ? (<DocumentReference>docRef).id : 'void')
      this.router.navigate(['dizziness-screen']);

    });

    }
 
    insertDizzinessScale(diznum){
      let userdata = JSON.parse(localStorage.getItem('user'));
      let feedbackid = localStorage.getItem('DailyFeedbackID');
      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(feedbackid).update({
        Dizziness: parseInt(diznum),
    } )
    .then((result) => {this.router.navigate(['dashboard']);}).catch((error) => {
      window.alert(error.message)
    })

  }
}
