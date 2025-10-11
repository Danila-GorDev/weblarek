import './scss/styles.scss';
import {Products} from './components/base/models/Products';
import {Buyer} from './components/base/models/Buyer';
import { Basket } from './components/base/models/Basket';
import { Server } from './components/base/models/Server';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';

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
buyerModel.setBuyerData({
  payment: 'card',
  address: 'г. Москва, ул. Ленина, д. 1',
  phone: '',
  email: 'user@example.com'
});

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
buyerModel.clearData()


// Карзина
const basketClass = new Basket ();
basketClass.addItem({
    id: 'afwfwef3f-fsl3l3-f3m,23k',
    category: 'String',
    title: 'Марковка',
    description: 'Очень полкзно',
    image: 'img/mork.jpg',
    price: 300
});

basketClass.addItem({
    id: 'sdghdf-svefwgwe-4634g34',
    category: 'Band',
    title: 'Кросовки',
    description: 'Всесезонные',
    image: 'img/morфф.jpg',
    price: 3800
});

basketClass.addItem({
    id: 'dhdgr-42532523f-fsdvsrr',
    category: 'Guuli',
    title: 'Программа',
    description: 'Фото Редактор',
    image: 'img/priioi.jpg',
    price: 1800
});

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
console.log('Есть ли выбранный товар в корзине?', basketClass.hasItem('sdghdf-svefwgwe-4634g34'));

// Удаляем товар
basketClass.removeItem('sdghdf-svefwgwe-4634g34');
console.log('Удалили выбраный товар из массива');

allItems = basketClass.getItems();
console.log('Все товары в корзине:', allItems);

total = basketClass.getTotalPrice();
console.log('Общая стоимость:', total);
// Очищаем корзину
basketClass.clear();