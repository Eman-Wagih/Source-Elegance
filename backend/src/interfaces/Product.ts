export interface Product {
  id?: number;
  productName: string;
  productDescription?: string;
  price: number;
  image: string[];
  rating?: number;
  seller: string;
}
