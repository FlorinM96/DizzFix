import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Services } from '@angular/core/src/view';
import {mergeMap} from 'rxjs/operators';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  exercises:any; 

  constructor(
    public db: AngularFirestore,    
    public router: Router,  ) {}

    insertMoodScale(moodnum)
    {
      let userdata = JSON.parse(localStorage.getItem('user'))
      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').add({
        Mood: parseInt(moodnum),
      })
      .then(docRef => {
      localStorage.setItem('DailyFeedbackID' , (docRef) ? (<DocumentReference>docRef).id : 'void')
      this.router.navigate(['dizziness-screen']);

    });

    }
    GetExercises(){
      let userdata = JSON.parse(localStorage.getItem('user'));

      return this.db.collection('PatientExercises').doc(userdata.uid).collection('ExerciseIDs')
      .snapshotChanges()
      .pipe(
        map(snap => {
        return {id:snap.payload.doc.id,
           ...snap.payload.doc.data()}
        }),mergeMap(pex=>{
          
            return this.db.doc('Exercises/'+pex.id).valueChanges()
            .pipe(
              map(exercise => {
                return {...exercise}
              })
            )
        })
      )

    //       return this.db.doc('Exercises/' +id).valueChanges()
    //       .map(data2 => Object.assign({}, {id, ...data, ...data2}));
    //     });
    //   }).flatMap(observables => this.joined =Observable.combineLatest(observables));
    // })
  }

      // exercises.ref.get()
      // .then((result) => { 
      //   this.DisplayExercises(result);
      //   console.log(result);

      
      // })
      // }
      // DisplayExercises(result)
      // {

    //   }
    //   db.collection("cities").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // });
  
    
    checkifexisdone(){
      let userdata = JSON.parse(localStorage.getItem('user'));
      let ExerciseFeedbackREF = this.db.collection('ExerciseFeedback').doc(userdata.uid+Date);
      
      ExerciseFeedbackREF.ref.get()
      .then(function(docSnapshot)  {
        if (docSnapshot.exists) {
          console.log('you have already completed the exercises')
        }
         else {
          console.log('calling getExercises')
          
          this.GetExercises(userdata);

        }
      });
      
      }

    insertDizzinessScale(diznum){
      let userdata = JSON.parse(localStorage.getItem('user'));
      let feedbackid = localStorage.getItem('DailyFeedbackID');
      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(feedbackid).update({
        Dizziness: parseInt(diznum),
        TimeStamp: firebase.database.ServerValue.TIMESTAMP
    } )
    .then((result) => {
      this.router.navigate(['dashboard']);}).catch((error) => {
      window.alert(error.message)
    })

  }


}
