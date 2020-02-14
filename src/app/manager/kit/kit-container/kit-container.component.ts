import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { drivataTrip, drivataTauxDeSecurite,single,conducteurs, regions, ChallengeVehicules } from '../mock-data/data';
import path1 from "../mock-data/sample-path.json";
import path2 from "../mock-data/tracks/track_points.json";
import * as shape from 'd3-shape';
import { formatLabel, escapeLabel } from 'src/app/shared/components/drivata-charts/common';
import { LatLngExpression } from 'leaflet';
import { Position } from 'src/app/shared/models/position';
import { Trajectory } from 'src/app/shared/models/trajectory';

@Component({
  selector: 'drivata-kit-container',
  templateUrl: './kit-container.component.html',
  styleUrls: ['./kit-container.component.scss']
})
export class KitContainerComponent implements OnInit {
  // chart line  
  view = [350,250];
  pieCharView = [375,275];
  //pieCharView1 = [550,450];
  colorScheme = 'forest';
  schemeType: string = 'ordinal';
  
  xTickValue = [0,10,20,30,40,50,60,70,80,90];
  yTickValue = [0,10,20,30,40,50,60,70,80];
  columns = [
    {name: 'Nom de conducteur',prop: 'nom'},
    {name: 'Eco conduite',prop:'tauxDeEcoConduite'},
    {name: 'Securité',prop:'tauxDeSecurite'},
    {name: 'Distraction',prop:'tauxDeDistraction'},
    //{name:'Nombre de trajectoires',prop:'trajectoires'}
  ]

  // circular rate score 
  RatingView = [100,100];
  limitOffset = 4;
  gaugeUnits: string = '';

  // doughnaut chart 
  tauxDeSecurite = drivataTauxDeSecurite;
  // pie chart
  pieChartData = ChallengeVehicules;
  pieLegend = true;
  // fake data
  conducteurs = conducteurs;
  data = drivataTrip;
  events = [{name:'startOfTrip',value: 20},{name:'trafic light',value: 40},{name:'intersection with priority',value: 60},{name:'end of trip',value:80}]
  ratingExample = {name: 'taux de securité',value: 7.5};
  rateTextValue = 'taux de securité';
  dataName1 ="taux de securité";
  dataName2 ="taux de eco conduite";
  dataName3 ="taux de distraction";
// map confif
position: Position = {
  latitude: -3.741436,
  longtitude: -38.603127,
  maxZoom: 40,
  zoom: 10
}
trajects: Trajectory[];
trajectoireSelectionne: Trajectory;
  
  animations = true;
  gradient = true;
  tooltipDisabled = false;

  

  constructor(private changeDer: ChangeDetectorRef) {

   }
  
  ngOnInit() {
    console.log(this.data);
    
    this.trajects = [
    {
      DebutDate: null,
      FinDate: null,
      Id: 1,
      arriveeAddress: '42 fulze',
      arriveeVille: 'sao paolo',
      departAddress: '25 mkjens lomd ituo',
      departVille: 'rio ',
      layerId: null,
      chemin:<LatLngExpression[]> path1,
      color: '#007bff',
      scoreDistraction: 4.6,
      scoreEcoConduite: 6.8,
      scoreSecurite: 8
    },
    {
      DebutDate: null,
      FinDate: null,
      Id: 2,
      arriveeAddress: '102 lopa vascez',
      arriveeVille: 'sao paolo',
      departAddress: '402 lomd ituo',
      departVille: 'rio ',
      layerId: null,
      chemin:<LatLngExpression[]> path2.features[0].geometry.coordinates,
      color: '#b55474',
      scoreDistraction: 3,
      scoreEcoConduite: 7.3,
      scoreSecurite: 9.4
    }
  ]
  }
  trajectoireUpdate(value){
    this.trajectoireSelectionne = value; 
    this.changeDer.detectChanges();
     
  }
  pieTooltipText({ data }) {

    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }
  
  select(value){
  }
  DoubleClick(value){

  }
  Select(value){

  }
  Activate(value){
    console.log(value);
    
  }
  Deactivate(value){

  }
  addUnit({value}){
    //return value + ' km'
  }

}
