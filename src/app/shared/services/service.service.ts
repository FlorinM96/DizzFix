import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { Router } from "@angular/router";




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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
    insertDizzinessScale(diznum){
      let userdata = JSON.parse(localStorage.getItem('user'));
      let feedbackid = localStorage.getItem('DailyFeedbackID');
      return this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback').doc(feedbackid).update({
        Dizziness: parseInt(diznum),
        TimeStamp: new Date()
    } )
    .then((result) => {
      this.router.navigate(['dashboard']);}).catch((error) => {
      window.alert(error.message)
    })

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




}
