let API =require('../API');
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//     host: "localhost:3306/js-project",
//     user: "root",
//     password: "!student21"
// });
//
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
function parseEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function parsePwd(password){
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;//Minimum eight characters, at least one letter and one number
    return re.test(password);
}
function temp(error, data){
    if (!error){
        console.log(data);
        window.location.href="http://localhost:3989";
    }
}
function sendToBack(error, data) {
    if (!error){
        console.log(data);
        if (data.length){
            console.log('200 OK');
            sessionStorage.setItem('user',JSON.stringify(data[0]));
            console.log(sessionStorage.getItem('user'));
            // API.homePage(temp);
        }
        else{
            console.log('user does not exist');
            $('#notFound').css({'height':'100px','opacity':'1'});
        }
    }
    else{
        console.log('error');
    }
}

$('#sendUserData').on('click', function () {
    let email = $('#email').val();
    let password = $('#password').val();
    if (!parseEmail(email) || !parsePwd(password)) {
        $('#error').css({'height':'100px','opacity':'1'});
        return;
    }
    else{
        $('#error').css({'height':'0','opacity':'0'});
    }
    let user_data = {
        email: email,
        password: password
    }
    console.log(user_data);
    API.checkUserInSystem(user_data, sendToBack);
});