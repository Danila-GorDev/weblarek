export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | undefined;
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IProduct {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    address: string | undefined;
    email: string | undefined;
    phone: string | undefined;
}

export interface IOrder extends IBuyer {
    items: string[];
    total: number;
}

export interface IOrderBack {
    id: string;
    total: number;
}