import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 59.4370;
  lng = 24.7536;
  transportSub: Subscription;
  
  constructor() { }
  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoibGVuYXJkMTI0IiwiYSI6ImNrMWtzcW93ZTFhZGEza2p5anlwdmlqdGoifQ.W-M2nFgwfGUs66suKydZxQ');
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    
    this.map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
      }), 'top-left'); 
  }
}


