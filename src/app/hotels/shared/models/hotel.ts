export interface IHotel {
  id: number;
  hotelName: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
}

// export class IHotel implements IHotel {
//   constructor(
//     public hotelId: number,
//     public hotelName: string,
//     public description: string,
//     public price: number,
//     public imageUrl: string,
//     public rating: number
//   )
// }
