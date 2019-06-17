import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "../../shared/services/service.service";
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  public info: any = [];
  constructor(    
    public authService: AuthService,
    public router: Router,
    public service:ServiceService,
    public db: AngularFirestore){}

  ngOnInit() {
    let userdata = JSON.parse(localStorage.getItem('user'));
    this.db.collection('Patients').doc(userdata.uid).valueChanges().subscribe(data =>{
      this.info.push(data);
      console.log(this.info)});
  }

}
