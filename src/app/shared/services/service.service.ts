import { Injectable, NgZone } from '@angular/core';
import { Feed,ExerciseIDs, Exercises } from "../services/Feed";
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { getLocaleDateTimeFormat } from '@angular/common';
import {mergeMap, flatMap} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { Observable,combineLatest  } from 'rxjs';
import { ExercisesComponent } from 'src/app/components/exercises/exercises.component';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  feedCollection : AngularFirestoreCollection<ExerciseIDs>;
  feedItem : Observable<Feed[]>;


  constructor(
    public db: AngularFirestore,    
    public router: Router,  ) {}


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
      this.feedCollection = this.db.collection('PatientExercises').doc(userdata.uid).collection('ExerciseIDs');
      this.feedItem =this.feedCollection.snapshotChanges().pipe(map(changes => {
        return changes.map( change => {
          const data = change.payload.doc.data();
          const ExID = data.ExerciseID;
            return this.db.doc('Exercises/' +ExID).valueChanges().pipe(map( (ExercisesData: Exercises) => {
              return Object.assign(
                {Name: ExercisesData.Name, Description: ExercisesData.Description}); }
            ));
        });
      }), flatMap(feeds => combineLatest(feeds)));
    
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
