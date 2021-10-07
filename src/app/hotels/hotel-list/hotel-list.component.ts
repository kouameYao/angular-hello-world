import { Component, OnInit } from '@angular/core';
import { IHotel } from 'src/app/hotels/shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  public title = 'Titre hotels';
  public hotels: IHotel[] = [];

  public showBadge: boolean = true;
  // Notre variale de filtre.
  public _hotelFilter = 'mot';
  public filteredHotels: IHotel[] = [];
  public receiveRating: string = '';
  public errorMsg: string = '';

  constructor(private hotelListService: HotelListService) {}

  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe({
      next: (hotels) => {
        (this.hotels = hotels), (this.filteredHotels = this.hotels);
      },
      error: (err) => (this.errorMsg = err),
    });
    this.hotelFilter = 'mot';
  }
  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  // Getter de notre variable de filtre
  public get hotelFilter(): string {
    return this._hotelFilter;
  }
  // Setter de notre variable de filtre
  // this._hotelFilter = filter;
  // On fait des modifications avant de retourner une quelconque valeur
  // On regarde si notre getter a pu attraper quelque chose.
  // Si oui, on appele la methode qui fait le tri dans la liste des hotels
  // puis on lui passe la chose attraper par notre getter

  public set hotelFilter(filter: string) {
    this._hotelFilter = filter;
    this.filteredHotels = this.hotelFilter
      ? this.filterHotels(this.hotelFilter)
      : this.hotels;
  }

  private filterHotels(criteria: string): IHotel[] {
    criteria = criteria.toLocaleLowerCase();

    const res = this.hotels.filter(
      (hotel: IHotel) =>
        hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1
    );

    return res;
  }

  public receiveRatingClicked(message: string): void {
    this.receiveRating = message;
  }
}
