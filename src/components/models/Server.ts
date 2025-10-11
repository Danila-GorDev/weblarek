import { IProduct, IApi, IOrder  } from "../../types";

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


  postOrder(id: Partial<IOrder>): Promise<IOrder> {
    return this.api.post('/product/', id);
  }

}