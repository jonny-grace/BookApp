export interface Book {
  id: number;
  title: string;
  description: string;
  discountrate: number;
  coverimage: string;
  price: number;
}

export interface APIBook {
  id: number;
  title: string;
  description: string;
  discountrate: number; // Non-camel-cased property as postgreSQL
  coverimage: string; // Non-camel-cased property as postgreSQL
  price: number;
}
