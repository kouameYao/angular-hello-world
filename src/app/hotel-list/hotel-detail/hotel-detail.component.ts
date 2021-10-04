import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../hotel';
import { HotelListService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  public hotel: any = {};
  // public hotel: IHotel = <IHotel>{};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelListService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find((hotel) => (hotel.hotelId = id));
      console.log(this.hotel);
    });
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }
}

// this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
//   this.hotel = hotels.find(hotel => hotel.hotelId === id)
// }).
