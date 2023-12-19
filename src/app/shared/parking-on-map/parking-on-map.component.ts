import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GeolocationServices } from 'src/app/services/geolocation-services';

@Component({
  selector: 'app-parking-on-map',
  templateUrl: './parking-on-map.component.html',
  styleUrls: ['./parking-on-map.component.scss'],
})
export class ParkingOnMapComponent {
  @Input() width = '300px';
  @Input() height = '30000px';
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 42.7,
    lng: 23.35,
  };
  zoom = 12;
  constructor(
    public geolocationService: GeolocationServices,
    public modalRef: MdbModalRef<ParkingOnMapComponent>
  ) {}
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  markers: any = [];
  userMarker: any = null;

  ngOnInit() {
    this.markers.push({
      position: {
        // 42.692706, 23.326826
        lat: 42.692706,
        lng: 23.326826,
      },
      label: {
        color: 'blue',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
      icon: {
        url: '../../../assets/marker/parking.png'
        //'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', // url
        // scaledSize: new google.maps.Size(50, 50), // size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(50, 50)
      },
    });
    setTimeout(()=>{
      // debugger
      if (this.geolocationService.userLat) {
        this.userMarker = {
          position: {
            // 42.692706, 23.326826
            lat: this.geolocationService.userLat,
            lng: this.geolocationService.userLon,
          },
          label: {
            color: 'blue',
            text: 'USER MARKER',
          },
          title: 'YOU ARE HERE',
          info: 'Marker info ',
          options: {
            animation: google.maps.Animation.DROP,
          },
          icon: {
            // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', // url
            url: '../../../assets/marker/vecteezy_map-location-pin-icon_22187606_804.png'
            // scaledSize: new google.maps.Size(50, 50), // size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(50, 50)
          },
        };
        this.markers.push(this.userMarker);
      }
    }, 1000)
  }
  closeMap() {
    this.modalRef.close();
  }
}
