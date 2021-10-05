import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IHotel } from 'src/app/hotels/shared/models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelListService {
  private readonly HOTEL_API_URL = 'api/hotels';
  constructor(private http: HttpClient) {}

  // Nous mettons observable sur le IHtotels car, le http ne retourne pas à la base une reponse de ce type IHotels
  // Nous nous lui disons que nous voulons observer cela afin qu'il le laisse ainsi
  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap((hotels) => console.log(hotels)),
      catchError(this.handleError)
    );
  }

  public getHotelById(id: number) {
    if (id === 0) {
      return of(this.defaultValue());
    }
    return this.getHotels().pipe(
      map((hotels) => hotels.find((hotel) => hotel.id === id))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  public defaultValue(): IHotel {
    return {
      id: 0,
      hotelName: '',
      price: 0,
      description: '',
      rating: 0,
      imageUrl: '',
    };
  }
}
