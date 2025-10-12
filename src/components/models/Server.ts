import { IProduct, IApi, IOrder, IOrderBack  } from "../../types";

// export class Server extends Api {

export class Server {
    protected api: IApi;
    
    constructor(api: IApi) {
        this.api = api;
    }

  getProduct(): Promise<IProduct[]> {
    return this.api.get<{total: number; items: IProduct[]}>('/product/')
    .then(data => data.items);
  }


  postOrder(data: IOrder): Promise<IOrderBack> {
    return this.api.post('/order/', data);
  }

}