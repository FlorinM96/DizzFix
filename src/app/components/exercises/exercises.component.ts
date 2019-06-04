import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "../../shared/services/service.service";
import { map, flatMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Feed, ExerciseIDs, Exercises } from 'src/app/shared/services/Feed';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  feedCollection : AngularFirestoreCollection<ExerciseIDs>;
  feedItem : Observable<Feed[]>;
exercises:any;
  constructor(
    public db: AngularFirestore,   
    public authService: AuthService,
    public router: Router,
    public service:ServiceService){}

  ngOnInit() {
    this.DisplayExercises();
  }
  getEXERCISES(){
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
    
    }
    DisplayExercises(){
      this.getEXERCISES();
      return this.feedItem.forEach(value => {
this.exercises=value;
        console.log(value)
      })
    }
  

  }

