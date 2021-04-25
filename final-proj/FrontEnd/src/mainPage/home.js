$('#my-dels').click(function () {
    window.location.href = 'http://localhost:3989/archive.html';
});

$('#new-del').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/order.html';
    }
});

$('#mini-shop').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/shop.html';
    }
});

$('#pay').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/payment.html';
    }
});

if (window.location.href === 'http://localhost:3989/'){
    $('.icon').css('display','none');
}
else{
    $('.icon').css('display','block');
}
$('.icon').on('click',function () {
    window.location.href = 'http://localhost:3989/';
})