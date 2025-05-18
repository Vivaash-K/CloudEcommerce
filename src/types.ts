export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  image: string;
  rating: number;
  reviews: Review[];
  numReviews: number;
} 