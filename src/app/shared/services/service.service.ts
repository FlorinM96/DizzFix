import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { formatDate } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  constructor(
    public db: AngularFirestore,    
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

   ) {}


    EditUserInfo(Fname, Lname){
  let userdata = JSON.parse(localStorage.getItem('user'))

  return this.db.collection('Patients').doc(userdata.uid).update({
  FirstName: Fname,
  LastName:Lname
})
    }


    insertMoodScale(moodnum)
    {
      let userdata = JSON.parse(localStorage.getItem('user'))

      let DateObj = new Date();
      let date = ('0' + DateObj.getDate()).slice(-2) + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + DateObj.getFullYear() 

      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(date).set({
        Mood: parseInt(moodnum),
      })
      .then(docRef => {
      this.router.navigate(['dizziness-screen']);

    });

    }
    insertDizzinessScale(diznum){
      let userdata = JSON.parse(localStorage.getItem('user'));
      let DateObj = new Date();
      let date = ('0' + DateObj.getDate()).slice(-2) + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + DateObj.getFullYear() 

      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(date).update({
        Dizziness: parseInt(diznum),
        TimeStamp: date
    } )
    .then((result) => {
      this.router.navigate(['feedback']);}).catch((error) => {
      window.alert(error.message)
    })

  }




}
