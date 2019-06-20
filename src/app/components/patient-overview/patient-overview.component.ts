import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import * as Plotly from 'plotly.js';
import { DailyFeedback} from 'src/app/shared/services/Feed';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {
  constructor( 
     public db: AngularFirestore,   
    ) { }
  @ViewChild('chartMood',{ read: ElementRef, static: false }) el: ElementRef;
  @ViewChild('chartDizziness',{ read: ElementRef, static: false }) el2: ElementRef;

  public x = [];
  public y= [];
  public z= [];
  
  feedCollection : AngularFirestoreCollection<DailyFeedback>;
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.getMood();
    this.getDizziness();

  }
  getMood(){
    let userdata = JSON.parse(localStorage.getItem('user'));
    this.feedCollection = this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback');
    this.feedCollection.snapshotChanges().subscribe(result => {
      return result.map( change => {

        // this.x = change.payload.doc.data().TimeStamp;
        // this.y=change.payload.doc.data().Mood;
        this.x.push(change.payload.doc.data().TimeStamp);
        this.y.push(change.payload.doc.data().Mood);
      const element = this.el.nativeElement;
      const data = [{
        x:this.x,
        y:this.y
      }]
      Plotly.plot(element, data);


      })
      }) 

    }
    getDizziness(){
      let userdata = JSON.parse(localStorage.getItem('user'));
      this.feedCollection = this.db.collection('Patients').doc(userdata.uid).collection('DailyFeedback');
      this.feedCollection.snapshotChanges().subscribe(result => {
        return result.map( change => {
  
          // this.x = change.payload.doc.data().TimeStamp;
          // this.y=change.payload.doc.data().Mood;
          this.x.push(change.payload.doc.data().TimeStamp);
          this.z.push(change.payload.doc.data().Dizziness);

        const element = this.el2.nativeElement;
        const data = [{
          x:this.x,
          y:this.z
        }]
        Plotly.plot(element, data);
        
  
        })
        }) 
  
      }
    
    

}
