export interface IProductProps {
  name: string;
  price: number;
}

export interface IUserProps {
  username: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IDispatchProps {
  orderId: string;
  note?: string;
  tableidentifier: string;
}

export interface IBillProps {
  orderId: string;
  formOfPayment: string;
}

export interface IOrderProducts {
  productId: string;
  quantity: number;
}

export interface ICreateOrder {
  tableId: string;
  client: string;
  products: IOrderProducts[];
}
