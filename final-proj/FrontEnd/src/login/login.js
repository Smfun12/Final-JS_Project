let API =require('../API');

function sendToBack(error, data) {
    if (!error){
        console.log(data);
    }
}
$('#sendUserData').on('click', function () {
    let email = $('#email').val();
    let password = $('#password').val();
    let user_data = {
        email: email,
        password: password
    }
    API.checkUserInSystem(user_data, sendToBack);
});