import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "../../shared/services/service.service";

@Component({
  selector: 'app-dizziness-screen',
  templateUrl: './dizziness-screen.component.html',
  styleUrls: ['./dizziness-screen.component.css']
})
export class DizzinessScreenComponent implements OnInit {

  constructor(    
    public authService: AuthService,
    public router: Router,
    public service:ServiceService){}

  ngOnInit() {
  }

}
