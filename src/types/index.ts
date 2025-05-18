export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: Review[];
  category: string;
  subCategory?: string;
  image: string;
  popularity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
  cart: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}
