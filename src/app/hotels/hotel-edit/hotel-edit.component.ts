import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  public hotel: IHotel = {
    hotelId: 0,
    hotelName: '',
    price: 0,
    description: '',
    rating: 1,
    imageUrl: '',
  };

  public pageTitle = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelListService: HotelListService
  ) {}

  public hotelForm: FormGroup = this.fb.group({
    hotelName: ['', Validators.required],
    hotelPrice: ['', Validators.required],
    starRating: [''],
    description: [''],
  });

  ngOnInit(): void {
    this.hotelForm;

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.getSelectedHotel(id);
    });
  }

  public getSelectedHotel(id: number): void {
    this.hotelListService.getHotelById(id).subscribe((hotel) => {
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel: any): void {
    this.hotel = hotel;

    if (this.hotel.hotelId === 0) {
      this.pageTitle = 'Ajouter hotel';
    } else {
      this.pageTitle = `Modifier l'hotel : ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      hotelPrice: this.hotel.price,
      starRating: this.hotel.rating,
      description: this.hotel.description,
    });
  }

  public saveHotel(): void {
    console.log(this.hotelForm.value);
  }
}
