export interface ProductType {
  _id: string;
  name: string;
  article: string;
  goodID: string;
  measureCode: string;
  measureName: string;
  ownerID: string;
  images: string[];
  quantity: {
    name: string;
    stockID: string;
    quantity: number;
  }[];
  price: number;
  priceOriginal: number;
  priceSale: number;
  priceOriginalSale: number;
  description: string;
  size: string;
  thickness: string;
  originCountry: string;
  type: string;
}

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface CategoriesType {
  _id: string;
  name: string;
  ID: string;
  ownerID?: string;
  productsHave: boolean;
}

export interface HierarchicalCategory extends CategoriesType {
  subCategories?: HierarchicalCategory[];
  expanded?: boolean;
}

export interface BasketTypeOnServerMutation {
  _id: string;
  user_id?: string;
  session_key?: string;
  items: {
    _id: string;
    product: ProductType;
    quantity: number;
    quantityToOrder: number;
  }[];
  totalPrice: number;
}

export interface BasketUpdateRequest {
  sessionKey?: string;
  product_id?: string;
  action: 'increaseToOrder' | 'decreaseToOrder' | 'increase' | 'decrease' | 'remove' | 'removeToOrder' | 'clear';
}

export interface OrderSendType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  paymentMethod: string;
  deliveryMethod: string;
  orderComment: string;
  products: {
    product: string;
    quantity: number;
    quantityToOrder: number;
  }[];
}
