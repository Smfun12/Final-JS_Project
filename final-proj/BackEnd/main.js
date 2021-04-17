/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    //Налаштування URL за якими буде відповідати сервер
    //app.get('/api/get-pizza-list/', api.getPizzaList);
    //app.post('/api/create-order/', api.createOrder);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);

    // Сторінка минулих замовленнів
    app.get('/archive.html', pages.archivePage);

    // Сторінка нового замовлення доставки
    app.get('/order.html', pages.orderPage);

    // Сторінка міні-маґазину
    app.get('/shop.html', pages.shopPage);

    // Сторінка міні-маґазину
    app.get('/payment.html', pages.paymentPage);

    // Сторінка реєстрації
    app.get('/signup.html', pages.signUpPage);

    // Друга сторінка нового замовлення доставки
    app.get('/orderparam.html', pages.orderParamPage);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('Final Project Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;