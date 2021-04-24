$(function () {
    let homePage = require('./mainPage/home');
    let signUpPage = require('./signUp/forSignUp');
    let archivePage = require('./viewDeliveries/archive');
    let loginPage = require('./login/login');
    let profilePage = require('./profile/profile');
    let orderPage = require('./orderPage/order');
    let payPage = require('./payments/payments');
    let orderParamPage = require('./ordrParamPage/orderParamMain');

    try {
        archivePage.initializeArchive();
        payPage.initializePayments();
    } catch (e) {

    }
    orderParamPage.initializeOrderParamPage();
    orderParamPage.showGif();
});