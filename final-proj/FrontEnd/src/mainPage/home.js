$('#new-del').click(function () {
    if (sessionStorage.getItem('user') === null) {
        window.location.href = 'http://localhost:3989/signup.html';
    }
    else {
        window.location.href = 'http://localhost:3989/order.html';
    }
});