import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public db: AngularFirestore
  ) { }

  ngOnInit() {
    let userdata = JSON.parse(localStorage.getItem('user'));
    this.db.collection('Patients').doc(userdata.uid).valueChanges().subscribe(info => console.log(info));
   }

}
