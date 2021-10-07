import { APP_BASE_HREF } from '@angular/common';
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
    const url = `${this.HOTEL_API_URL}/${id}`
    if (id === 0) {
      return of(this.defaultValue());
    }
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  public createHotel(hotel : IHotel) : Observable<IHotel> {
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/hotel-room.jpg',
      id: null,
    }
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleError)
    )
  }

  public updateHotel(hotel : IHotel) : Observable<IHotel>{
    const url = `${this.HOTEL_API_URL}/${hotel.id}`
    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    )
  }

  public deleteHotel(id : null) : Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${id}`
    return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage : string;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorMessage = `An error occurred:', ${error.error}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      errorMessage = `Backend returned code ${error.status}, body was: ` + error.error
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.' + errorMessage);
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
