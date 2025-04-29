export interface ProductAttributesI {
  id: number;
  name: string;
  img_url: string;
  category_id: number;
}

export interface ProductI {
  id: number;
  name: string;
  img_url: string;
  category: string;
}

export interface ProductWithPricesI extends ProductI {
  prices: ProductPriceI[];
}

export interface ProductPriceI {
  id: number;
  price: number;
  created_at: string;
  last_updated: Date;
  supermarket: string;
}
