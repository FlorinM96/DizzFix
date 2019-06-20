import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceService } from 'src/app/shared/services/service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: any = [];

  constructor(
    public service: ServiceService,

    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public db: AngularFirestore
  ) { }

  ngOnInit() {
    this.service.getUserInfo()
    .subscribe(data =>{
      this.info.push(data);
      console.log(this.info)});
   }

}
