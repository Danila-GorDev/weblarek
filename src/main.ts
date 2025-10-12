import './scss/styles.scss';
import {Products} from './components/models/Products';
import {Buyer} from './components/models/Buyer';
import { Basket } from './components/models/Basket';
import { Server } from './components/models/Server';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { apiProducts } from './utils/data';

//Каталог продуктов
const products = new Products();
const api = new Api(API_URL);
const server = new Server(api)


//Получение массива товаров с сервера
server.getProduct()
  .then(data => {
    products.setItems(data)
    console.log(`Массив продуктов:`, products.getItems());
    console.log(`Получение продукта по id::`, products.getItem('1c521d84-c48d-48fa-8cfb-9d911fa515fd'));
    console.log('Cохранение товара для подробного отображения');
    products.setSelectedProduct('b06cde61-912f-4663-9751-09956c0eed67')
    console.log(`Название продукта:`,products.getSelectedProduct()?.title);
    console.log(`Категория продукта:`,products.getSelectedProduct()?.category);
    console.log(`Описание продукта:`,products.getSelectedProduct()?.description);
    console.log(`Цена продукта:`,products.getSelectedProduct()?.price);
  })
  .catch(err => console.log('Ошибка сервера: ', err));


// Покупатель  
const buyerModel = new Buyer();

//Сохранение данных
buyerModel.setBuyerData({payment: 'card'});
buyerModel.setBuyerData({phone: '+7 (234) 999-99-99'});
buyerModel.setBuyerData({email: '+7 (234) 999-99-99'});
buyerModel.setBuyerData({address: '+7 (234) 999-99-99'});

//Подучение данных 
const buyerData = buyerModel.getBuyerData()
console.log("Метод оплаты: ", buyerData.payment);
console.log("Адресс: ", buyerData.address);
console.log("Телефон: ", buyerData.phone);
console.log("Email: ", buyerData.email);

//Валидация полей
const validationResult = buyerModel.validate();
if (!validationResult.isValid) {
  console.error('Ошибка:', validationResult.errors);
}
//Очистка полей
// buyerModel.clearData()


// Карзина
const basketClass = new Basket ();
basketClass.addItem(apiProducts.items[3]);
basketClass.addItem(apiProducts.items[0]);
basketClass.addItem(apiProducts.items[1]);
basketClass.addItem(apiProducts.items[2]);
// Получаем все товары
let allItems = basketClass.getItems();
console.log('Все товары в корзине:', allItems);

// Получаем общую стоимость
let total = basketClass.getTotalPrice();
console.log('Общая стоимость:', total);

//получение количества товаров в корзине
let totalItems = basketClass.getTotalItems();
console.log('Всего товаров:', totalItems);

// Проверяем наличие товара
console.log('Есть ли выбранный товар в корзине?', basketClass.hasItem('b06cde61-912f-4663-9751-09956c0eed67'));

// Удаляем товар
basketClass.removeItem('b06cde61-912f-4663-9751-09956c0eed67');
console.log('Удалили выбраный товар из массива');

allItems = basketClass.getItems();
console.log('Все товары в корзине:', allItems);

total = basketClass.getTotalPrice();
console.log('Общая стоимость:', total);
// Очищаем корзину
// basketClass.clear();

const orderData = {
    ...buyerModel.getBuyerData(),
    total: basketClass.getTotalPrice(),
    items: basketClass.getItems().map((item) => item.id),
  };
server.postOrder(orderData).then((order) => {
  console.log(" Заказ отправлен на сервер:", order);
}).catch((err) => {
  console.error(" Ошибка при отправке заказа на сервер:", err);
});