import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, SimpleChange, SimpleChanges } from '@angular/core';
import { Position } from '../../models/position';
import { tileLayer, latLng,LatLngBounds, Polyline, LatLngExpression, polyline, Layer, Map, Marker, Icon, circle, polygon, marker, Point, point, LatLng, TileLayer, FitBoundsOptions } from 'leaflet';
import { Trajectory } from '../../models/trajectory';
import { TripDetail } from 'src/app/manager/drivers/models/driverTrip';

@Component({
  selector: 'drivata-trajectory-map',
  templateUrl: './trajectory-map.component.html',
  styleUrls: ['./trajectory-map.component.scss']
})
export class TrajectoryMapComponent implements OnInit, OnChanges {


  @Input() tripDetail: TripDetail;
  @Input() mapPosition: Position;
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      '500-Circle': circle([-3.4692812,
      -38.97376], { radius: 500 }),
      '5-Circle': circle([-3.4692812,
      -38.97376], { radius: 5 }),
      '50-Circle': circle([-3.4692812,
      -38.97376], { radius: 50 }),
      '5000-Circle': circle([-3.4692812,
      -38.97376], { radius: 5000 }),
      '50000-Circle': circle([-3.4692812,
      -38.97376], { radius: 50000 }),
      '500000-Circle': circle([-3.4692812,
      -38.97376], { radius: 500000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),
      'marker': marker([-3.4692812,
      -38.97376])

    }
  }
  @Output() pathUpdate = new EventEmitter<any>();
  icons_Url = 'assets/img/map-icons/';
  depart_icon = new Icon(
    {
      iconUrl: this.icons_Url + 'start-point.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 18],
      popupAnchor: [0, 0],
      shadowSize: [20, 20],
      shadowAnchor: [0, 0]
    }
  );
  arrivee_icon = new Icon(
    {
      iconUrl: this.icons_Url + 'target-point.svg',
      iconSize: [20, 20],
      iconAnchor: [10, 18],
      popupAnchor: [0, 0],
      //shadowUrl: 'Arrive',
      shadowSize: [20, 20],
      shadowAnchor: [0, 0]
    }
  );
  path: any[] = [];
  trajectId = 0;
  center: LatLng;
  zoom:any;
  layers: TileLayer[];
  BoundsOptions:LatLngBounds;
  // controlOptions = {
  //   attributionControl: false
  // }
  constructor() { }
  ngOnInit() {
    
    // this.path.forEach(element => {
    //   let startPoint = new Marker(element.chemin[0], { icon: this.depart_icon })
    //   startPoint.bindTooltip(element.departAddress, { direction: 'top', offset: point(0, -15) });
    //   let endPoint = new Marker(element.chemin[element.chemin.length - 1], { icon: this.arrivee_icon });
    //   endPoint.bindTooltip(element.arriveeAddress, { direction: 'top', offset: point(0, -15) });
    //   let route = new Polyline(element.chemin, { weight: 5, lineCap: 'round', lineJoin: 'round', dashArray: [4], dashOffset: '3', fill: false, color: element.color });
    //   this.paths.push(route, startPoint, endPoint);
    // });
  }
  ngOnChanges(changes: SimpleChanges) {
    let pos = changes.mapPosition
    if(pos && pos.previousValue != pos.currentValue){
      this.center = latLng(pos.currentValue.longtitude, pos.currentValue.latitude);
      this.zoom = pos.currentValue.zoom;
      
      this.layers = [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: pos.currentValue.maxZoom, attribution: 'Drivata', })
      ]

    }
    let trip = changes.tripDetail
    if (trip && trip.previousValue != trip.currentValue) {
      this.path = [];      
      let northEast = new LatLng(Math.max(...this.tripDetail.cords.map(t => t.latitude)),Math.max(...this.tripDetail.cords.map(t => t.longtitude)));
      let southWest = new LatLng(Math.min(...this.tripDetail.cords.map(t => t.latitude)),Math.min(...this.tripDetail.cords.map(t => t.longtitude)));
      let cords = this.tripDetail.cords.map(t => new LatLng(t.latitude,t.longtitude));      
      this.BoundsOptions = new LatLngBounds(southWest,northEast)
      let startPoint = new Marker(cords[0], { icon: this.depart_icon })
      startPoint.bindTooltip(this.tripDetail.startAddress, { direction: 'top', offset: point(0, -15) });
      let endPoint = new Marker(cords[cords.length-1], { icon: this.arrivee_icon });
      endPoint.bindTooltip(this.tripDetail.arrivalAddress, { direction: 'top', offset: point(0, -15) });
      let route = new Polyline(cords, { weight: 5, lineCap: 'round', lineJoin: 'round', dashArray: [4], dashOffset: '3', fill: false, color: '#0e47f0' });
      this.path.push(route,startPoint,endPoint);
    }
  }
  AddPath(value) {
    let layerId = value._leaflet_id;
    // value.addEventListener('click', (evt) => {
    //   const i = this.path.findIndex(trajectoire => trajectoire.layerId == value._leaflet_id);
    //   if (i != -1) {
    //     this.pathUpdate.emit(this.path[i]);
    //   }
    // });
    // value.addEventListener('mouseover', (evt) => {
    //   if (value instanceof Polyline) {
    //     value.bringToFront();
    //     value.setStyle({ weight: 8 })
    //   }
    // });
    // value.addEventListener('mouseout', (evt) => {
    //   if (value instanceof Polyline) {
    //     value.setStyle({ weight: 5 })

    //   }
    // });
    // if (value instanceof Polyline) {
    //   this.path[this.trajectId].layerId = layerId;
    //   this.trajectId++;
    // }
  }
  MapReady(value: Map){

  }
  selectPath(value) { }
}
