$('#my-dels').click(function () {
    window.location.href = 'http://localhost:3989/archive.html';
});

$('#my-dels-txt').click(function () {
    $('#my-dels').click();
});

$('#new-del').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/order.html';
    }
});

$('#new-del-txt').click(function () {
    $('#new-del').click();
});

$('#mini-shop').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/shop.html';
    }
});

$('#mini-shop-txt').click(function () {
    $('#mini-shop').click();
});

$('#pay').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/payment.html';
    }
});

$('#pay-txt').click(function () {
    $('#pay').click();
});

$('.icon').on('click',function () {
    window.location.href = 'http://localhost:3989/';
})