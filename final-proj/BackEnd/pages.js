/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Universal Delivery'
    });
};

exports.archivePage = function(req, res) {
    res.render('archivePage', {
        pageTitle: 'My Deliveries'
    });
};

exports.orderPage = function(req, res) {
    res.render('orderPage', {
        pageTitle: 'Order a Delivery'
    });
};

exports.shopPage = function(req, res) {
    res.render('shopPage', {
        pageTitle: 'Mini shop'
    });
};

exports.paymentPage = function(req, res) {
    res.render('paymentPage', {
        pageTitle: 'Pay for Delivery'
    });
};

exports.signUpPage = function(req, res) {
    res.render('signUpPage', {
        pageTitle: 'Sign up'
    });
};