import "./scss/styles.scss";
import { Products } from "./components/models/Products";
import { Buyer } from "./components/models/Buyer";
import { Basket } from "./components/models/Basket";
import { Server } from "./components/models/Server";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { CardCatalog } from "./components/views/Card/CardCatalog";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/views/Gallery";
import { Header } from "./components/views/Header";
import { CBasket } from "./components/views/CBasket";
import { Modal } from "./components/views/Modal";
import { CardPreview } from "./components/views/Card/CardPreview";
import { IBuyer, IProduct } from "./types";
import { CardBasket } from "./components/views/Card/CardBasket";
import { Order } from "./components/views/Form/Order";
import { Contact } from "./components/views/Form/Contact";
import { Success } from "./components/views/Success";

//Подключение классов
const events = new EventEmitter();
const products = new Products(events);
const buyerModel = new Buyer(events);
const backet = new Basket(events);
const api = new Api(API_URL);
const server = new Server(api);
const gallery = new Gallery(ensureElement(".gallery"));
const header = new Header(events, ensureElement(".header"));
const modal = new Modal(events, ensureElement("#modal-container"));


// Подключение темплейтов
const order = new Order(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#order")),
  events
);
const contact = new Contact(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#contacts")),
  events
);
const cardBasket = new CBasket(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#basket")),
  events
);
const success = new Success(
  cloneTemplate(ensureElement<HTMLTemplateElement>("#success")),
  events
);
const cardPrev = new CardPreview(
    cloneTemplate(ensureElement<HTMLTemplateElement>("#card-preview")),
    events
  );

// Получение массива товаров с сервера
server
  .getProduct()
  .then((data) => {
    products.setItems(data);
  })
  .catch((err) => console.log("Ошибка сервера: ", err));

// Событие кнопки "Оформить" в корзине (CBasket.ts)
events.on("form:order", () => {
  modal.render({ content: order.render() });
});

// Событие кнопки "Далее" в корзине (Form.ts)
events.on("order:submit", () => {
  modal.render({ content: contact.render() });
});

// Событие кнопки "За новыми покупками" после отправки заказа (Success.ts)
events.on("button:close", () => {
  modal.closeModal();
  
});

// Событие кнопки "Оплатить" в корзине (Form.ts)
events.on("contacts:submit", () => {

    success.total = backet.getTotalPrice()

const orderData = {
    ...buyerModel.getBuyerData(),
    total: backet.getTotalPrice(),
    items: backet.getItems().map((item) => item.id),
  };

server.postOrder(orderData)
.then((order) => {
  backet.clear();
  buyerModel.clearData();
  console.log(" Заказ отправлен на сервер:", order);
}).catch((err) => {
  console.error(" Ошибка при отправке заказа на сервер:", err);
});


  modal.render({ content: success.render() });
});

// Событие заполнения полей заказа (Form.ts)
events.on("form:change", (event: { field: keyof IBuyer; value: string }) => {
  buyerModel.setBuyerData({ [event.field]: event.value });
});

// Событие изменений в данных покупателя (Buyer.ts)
events.on("data:change", () => {
  const validate = buyerModel.validate();
  const buyerData = buyerModel.getBuyerData();

  order.payment = buyerData.payment;

  const errorOrder = validate.errors.payment
    ? validate.errors.payment
    : validate.errors.address
    ? validate.errors.address
    : "";

  order.error = errorOrder;

  if (buyerData.payment && buyerData.address !== "") {
    order.submit = true;
  }

  const errorContact = validate.errors.email
    ? validate.errors.email
    : validate.errors.phone
    ? validate.errors.phone
    : "";

  contact.error = errorContact;

  if (buyerModel.validate().isValid) {
    contact.submit = true;
  }

});

// Событие изменений в данных товаров (Products.ts)
events.on("product:chenged", () => {
  const items = products.getItems().map((item) => {
    const card = new CardCatalog(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-catalog")),
      {
        onClick: () => events.emit("card:select", item),
      }
    );
    return card.render(item);
  });
  gallery.render({ list: items });
});

// Событие открывает карточку выбранного товара в галлерее (product:chenged)
events.on("card:select", (item: IProduct) => {
  const product = products.getItem(item.id);
  products.setSelectedProduct(item.id);

  if (!product) {
    return;
  }

  let textButton = "";
  if (!product.price) {
    textButton = "Недоступно";
  } else {
    textButton = backet.hasItem(item.id) ? "Удалить из корзины" : "Купить";
  }
  cardPrev.buttonText = textButton;

  modal.render({ content: cardPrev.render(product) });
  modal.openModal();
});

// Событие кнопки в карточке превью товара (CardPrieview.ts)
events.on("preview:button", () => {
  const tovar = products.getSelectedProduct();
  if (tovar) {
    if (backet.hasItem(tovar.id)) {
      backet.removeItem(tovar.id);
    } else {
      backet.addItem(tovar);
    }
  }
  cardBasket.total = backet.getTotalPrice();
  modal.closeModal();
});

// Событие удаления товара из корзины (CardBasket.ts)
events.on("product:delete", ({ id }: { id: string }) => {
  backet.removeItem(id);
  cardBasket.total = backet.getTotalPrice();
  modal.render({ content: cardBasket.render() });
});

// Событие открытия корзины на главной странице (Header.ts)
events.on("basket:open", () => {
  modal.openModal();
  modal.render({ content: cardBasket.render() });
});

// Событие изменений в корзине (Basket.ts)
events.on("basket:chenged", () => {
  const product = backet.getItems().map((item, index) => {
    const card = new CardBasket(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-basket")),
      events
    );
    return card.render({
      ...item,
      index: index + 1,
    });
  });

  if (product.length === 0) {
    cardBasket.order = false;
  } else {
    cardBasket.order = true;
  }

  header.counter = backet.getTotalItems();
  cardBasket.render({ list: product });
});












//Получение массива товаров с сервера

// Покупатель

// //Сохранение данных
// buyerModel.setBuyerData({payment: 'card'});
// buyerModel.setBuyerData({phone: '+7 (234) 999-99-99'});
// buyerModel.setBuyerData({email: '+7 (234) 999-99-99'});
// buyerModel.setBuyerData({address: '+7 (234) 999-99-99'});

// //Получение данных
// const buyerData = buyerModel.getBuyerData()
// console.log("Метод оплаты: ", buyerData.payment);
// console.log("Адресс: ", buyerData.address);
// console.log("Телефон: ", buyerData.phone);
// console.log("Email: ", buyerData.email);

//Валидация полей
// const validationResult = buyerModel.validate();
// if (!validationResult.isValid) {
//   console.log('Ошибка:', validationResult.errors);
// }
//Очистка полей
// buyerModel.clearData()

// // Карзина
// const basketClass = new Basket (events);
// basketClass.addItem(apiProducts.items[3]);
// basketClass.addItem(apiProducts.items[0]);
// basketClass.addItem(apiProducts.items[1]);
// basketClass.addItem(apiProducts.items[2]);
// // Получаем все товары
// let allItems = basketClass.getItems();
// console.log('Все товары в корзине:', allItems);

// // Получаем общую стоимость
// let total = basketClass.getTotalPrice();
// console.log('Общая стоимость:', total);

// //получение количества товаров в корзине
// let totalItems = basketClass.getTotalItems();
// console.log('Всего товаров:', totalItems);

// // Проверяем наличие товара
// console.log('Есть ли выбранный товар в корзине?', basketClass.hasItem('b06cde61-912f-4663-9751-09956c0eed67'));

// // Удаляем товар
// basketClass.removeItem('b06cde61-912f-4663-9751-09956c0eed67');
// console.log('Удалили выбраный товар из массива');

// allItems = basketClass.getItems();
// console.log('Все товары в корзине:', allItems);

// total = basketClass.getTotalPrice();
// console.log('Общая стоимость:', total);
// // Очищаем корзину
// // basketClass.clear();

// const orderData = {
//     ...buyerModel.getBuyerData(),
//     total: basketClass.getTotalPrice(),
//     items: basketClass.getItems().map((item) => item.id),
//   };
// server.postOrder(orderData).then((order) => {
//   console.log(" Заказ отправлен на сервер:", order);
// }).catch((err) => {
//   console.error(" Ошибка при отправке заказа на сервер:", err);
// });
