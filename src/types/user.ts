export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  purchaseHistory: PurchaseHistory[];
}

export interface PurchaseHistory {
  orderId: string;
  date: string;
  items: PurchaseItem[];
  totalAmount: number;
}

export interface PurchaseItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
} 