import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  public hotel: IHotel = {
    id: 0,
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
    private router : Router,
    private hotelListService: HotelListService
  ) {}

  public hotelForm: FormGroup = this.fb.group({
    hotelName: ['', Validators.required],
    price: ['', Validators.required],
    rating: [''],
    description: [''],
    tags: this.fb.array([])
  });

  ngOnInit(): void {
    this.hotelForm;
    this.tags
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

    if (this.hotel.id === 0) {
      this.pageTitle = 'Ajouter hotel';
    } else {
      this.pageTitle = `Modifier l'hotel : ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []))
  }

  public saveHotel(): void {
    if (this.hotelForm.valid) {
      if (this.hotelForm.dirty) {
        const hotel : IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        }
        if (hotel.id === 0) {
          this.hotelListService.createHotel(hotel).subscribe({
            next : () => this.saveCompleted()
          })
        } else {
          this.hotelListService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted()
          })
        }
      }
    }
    console.log(this.hotelForm.value);
  }

  public delete() : void {
    if (confirm(`Voulez-vous supprimer ${this.hotel.hotelName} ?`)) {
      this.hotelListService.deleteHotel(this.hotel.id).subscribe({
        next : () => this.saveCompleted()
      })
    }

  }

  public saveCompleted() : void {
    this.hotelForm.reset()
    this.router.navigate(['/hotels'])
  }

  // Formulaire dynamique

  public get tags() : FormArray {    
    return this.hotelForm.get('tags') as FormArray
  }

  public addTag(): void {
    this.tags.push(new FormControl())
  }

  public deleteTag(index: number) : void {
    this.tags.removeAt(index)
    this.tags.markAsDirty()
  }
}
