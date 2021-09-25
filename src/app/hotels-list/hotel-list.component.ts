import { Component, OnInit } from '@angular/core';
import { IHotel } from './hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  ngOnInit(): void {
    console.log('Mon cycle de vie OnInit fonctionne correctement');
  }
  public title = 'Titre hotels';
  public hotels: IHotel[] = [
    {
      hotelId: 1,
      hotelName: 'Hotel 1',
      description: 'Description de hotel',
      price: 230.0,
      imageUrl: '/assets/img/hotel-room.jpg',
    },
    {
      hotelId: 2,
      hotelName: 'Hotel 2',
      description: 'Description de hotel',
      price: 240.0,
      imageUrl: '/assets/img/indoors.jpg',
    },
    {
      hotelId: 3,
      hotelName: 'Hotel 3',
      description: 'Description de hotel',
      price: 2234.0,
      imageUrl: '/assets/img/the-interior.jpg',
    },
    {
      hotelId: 4,
      hotelName: 'Hotel 4',
      description: 'Description de hotel',
      price: 2234.0,
      imageUrl: '/assets/img/window.jpg',
    },
  ];

  public showBadge: boolean = false;
  public hotelFilter = 'mot';

  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }
}
