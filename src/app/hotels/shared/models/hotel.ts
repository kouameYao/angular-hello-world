export interface IHotel {
  id: any;
  hotelName: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  tags?: string[]
  // En prefixant l'attribut d'un point d'interrogation, on le rend optionnel
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
