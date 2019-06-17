import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import * as Plotly from 'plotly.js';
@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {
  constructor() { }
  @ViewChild('chart',{ read: ElementRef, static: false }) el: ElementRef;

  ngOnInit() {
  }
  ngAfterViewInit() {
      this.basicChart();
  }

basicChart(){
  const element = this.el.nativeElement;
  const data = [{
    x: ['10.11.1996', '11.11.1996', '12.11.1996', '13.11.1996', '14.11.1996', '15.11.1996', '16.11.1996', '17.11.1996', '18.11.1996', '19.11.1996', '20.11.1996'],
    y:[5,1,5,3,4,5,4,3,2,4,5]
  }];
  const style = {margin: {t:0}};
  Plotly.plot(element, data, style);

}
}
