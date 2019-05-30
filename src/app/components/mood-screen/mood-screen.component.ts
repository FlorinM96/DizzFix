import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "../../shared/services/service.service";

@Component({
  selector: 'app-mood-screen',
  templateUrl: './mood-screen.component.html',
  styleUrls: ['./mood-screen.component.css']
})
export class MoodScreenComponent implements OnInit {

  constructor(    
    public authService: AuthService,
    public router: Router,
    public service:ServiceService){}

  ngOnInit() {
  }

}
