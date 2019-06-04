import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { ServiceService } from "../../shared/services/service.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises:any; 

  constructor(
    public authService: AuthService,
    public router: Router,
    public service:ServiceService){}

  ngOnInit() {
    this.getEXERCISES();
  }
  getEXERCISES(){
    this.service.GetExercises()
    .subscribe(result => {
      this.exercises = result;
      console.log(result);
    })

  }
}
