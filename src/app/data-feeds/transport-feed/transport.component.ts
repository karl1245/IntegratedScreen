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
  //map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 59.438689;
  lng = 24.756526;
  transportSub: Subscription;

  constructor() { }
  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').
        set('pk.eyJ1IjoibGVuYXJkMTI0IiwiYSI6ImNrMWtzcW93ZTFhZGEza2p5anlwdmlqdGoifQ.W-M2nFgwfGUs66suKydZxQ');
    let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 16.15,
        center: [this.lng, this.lat]
    });


    /* Image: An image is loaded and added to the map. */
    // tslint:disable-next-line:only-arrow-functions
    map.on('load', function () {
      // tslint:disable-next-line:only-arrow-functions
      map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {
        if (error) {
          throw error;
        }
        map.addImage('custom-marker', image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
          id: 'markers',
          type: 'symbol',
          /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [24.7566, 59.4387]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'custom-marker',
          }
        });
      });
    });
    // Add map controls
    /*
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
      }), 'top-left');
     */
  }
}


